import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ToastAndroid,
} from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import {
  TextInput,
  HelperText,
  RadioButton,
  Checkbox,
} from "react-native-paper";
import * as Yup from "yup";
import {
  useRequestedServiceStore,
  useJobOrderStore,
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { httpGetJobOrder, httpUpsertJobOrder } from "../../api/jobOrders.api";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useRouterStore } from "../../Store/routerStore";

const ValidationCustomer = Yup.object().shape({
  Description: Yup.string(),
});

function RequestedService({ navigation }) {
  //Store Hooks
  const setRequestedService = useRequestedServiceStore(
    (state) => state.setRequestedService
  );
  const pageSelection = useJobOrderStore((state) => state.pageSelection);
  const editRequestedService = useJobOrderStore(
    (state) => state.editRequestedService
  );
  const setReloadJobOrderList = useJobOrderStore(
    (state) => state.setReloadJobOrderList
  );
  const carId = useVehicleInfoStore((state) => state.id);
  const customerId = useCustomerInfoStore((state) => state.id);
  const id = useRequestedServiceStore((state) => state.id);

  // Use Effect Hook that get the data
  useEffect(() => {
    async function handleGetRequestedInfo() {
      try {
        const jobInfo = await httpGetJobOrder(id);
        setRequestedData(jobInfo);
        CheckedServiceRequest(jobInfo);
      } catch (error) {
        setErrorMessage("Could not fetch requested service information.");
      }

      setIsFetching(false);
      setInitializeData(true);
      setDisableInput(true);
    }

    if (editRequestedService) {
      handleGetRequestedInfo();
    } else {
      setDisableInput(false);
      setIsFetching(false);
    }
  }, [editRequestedService]);

  //Use State Hook
  const [dialogVisible, setDialogVisible] = useState(false);
  const [checkedOilChange, setCheckedOilChange] = useState(false);
  const [checkedTuneUp, setCheckedTuneUp] = useState(false);
  const [checkedBreaks, setCheckedBreaks] = useState(false);
  const [checkedMotor, setCheckedMotor] = useState(false);
  const [checkedElectricSystem, setCheckedElectricSystem] = useState(false);
  const [checkedCoolingSystem, setCheckedCoolingSystem] = useState(false);
  const [checkedSuspencion, setCheckedSuspencion] = useState(false);
  const [checkedScan, setCheckedScan] = useState(false);
  const [checkedAirConditioning, setCheckedAirConditioning] = useState(false);
  const [checked, setChecked] = useState(false);
  const [requestedData, setRequestedData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const [initilizeData, setInitializeData] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const RequestedServiceNextPage = useRouterStore(
    (state) => state.NewRequestedServiceNextPage
  );

  //funtion for the page navigation
  //? home
  function goHomeAction() {
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  //? go back
  function goBackAction() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  //? next
  function goNextAction() {
    const pageAction = StackActions.push(RequestedServiceNextPage);
    navigation.dispatch(pageAction);
  }

  const ref = useRef(null);

  function CheckedServiceRequested() {
    let valueChecked = [];

    if (checkedOilChange) {
      valueChecked.push("Oil Change");
    }

    if (checkedTuneUp) {
      valueChecked.push("Tune Up");
    }

    if (checkedBreaks) {
      valueChecked.push("Brakes");
    }

    if (checkedMotor) {
      valueChecked.push("Motor");
    }

    if (checkedElectricSystem) {
      valueChecked.push("Electric System");
    }

    if (checkedCoolingSystem) {
      valueChecked.push("Cooling System");
    }

    if (checkedSuspencion) {
      valueChecked.push("Suspension");
    }

    if (checkedScan) {
      valueChecked.push("Scan");
    }

    if (checkedAirConditioning) {
      valueChecked.push("Air Conditioning");
    }

    return valueChecked.join(", ");
  }

  function CheckedServiceRequest(info) {
    const val = info.data.requestedService.split(";");
    setChecked(info.data.jobLoadType);

    val.forEach((value) => {
      if (value == "OilChange") {
        setCheckedOilChange(true);
      }
      if (value == "TuneUp") {
        setCheckedTuneUp(true);
      }
      if (value == "Breaks") {
        setCheckedBreaks(true);
      }
      if (value == "Motor") {
        setCheckedMotor(true);
      }
      if (value == "ElectricSystem") {
        setCheckedElectricSystem(true);
      }
      if (value == "CoolingSystem") {
        setCheckedCoolingSystem(true);
      }
      if (value == "Suspencion") {
        setCheckedSuspencion(true);
      }
      if (value == "Scan") {
        setCheckedScan(true);
      }
      if (value == "AirConditioning") {
        setCheckedAirConditioning(true);
      }
    });
  }

  function errorHandler() {
    setErrorMessage(null);
  }

  if (errorMessage && !isFetching) {
    return (
      <View style={{ marginTop: 200 }}>
        <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />
      </View>
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  //Update the data of the Client
  async function handleRequestedServiceUpdate() {
    let val = CheckedServiceRequested();

    let info = {
      id: id,
      requestedService: val,
      serviceDetails: ref.current.values.Description,
      status: requestedData.data.status,
      jobLoadType: checked,
      policySignature: requestedData.data.policySignature,
      carId: carId,
      customerId: customerId,
    };

    try {
      const infoCar = await httpUpsertJobOrder(info);

      showSuccessMessage();
      setReloadJobOrderList();
    } catch (error) {
      console.log("ERROR MESSAGE CLIENT: ", error);
      showFailedMessage();
    }
  }

  //Toast Message
  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
  }

  function showFailedMessage() {
    ToastAndroid.show("Try Again, there was a problem!", ToastAndroid.SHORT);
  }

  function DataRespondFormik() {
    let dataPassed;

    if (initilizeData) {
      dataPassed = {
        Description: requestedData.data.serviceDetails,
      };
    } else {
      dataPassed = {
        Description: "",
      };
    }

    return dataPassed;
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            goBackAction();
          }}
        />
        {editRequestedService === true && saveData === false && (
          <Appbar.Action
            icon="square-edit-outline"
            onPress={() => {
              setSaveData(!saveData);
              setDisableInput(false);
            }}
            iconColor={Colors.black}
          />
        )}
        {editRequestedService === true && saveData === true && (
          <Appbar.Action
            icon="content-save"
            onPress={async () => {
              handleRequestedServiceUpdate();
              setSaveData(!saveData);
              setDisableInput(true);
            }}
            iconColor={Colors.black}
          />
        )}
        <Appbar.Content title="Requested Service"></Appbar.Content>
        <Appbar.Action
          icon="home"
          onPress={() => goHomeAction()}
          iconColor={Colors.black}
        />
        {pageSelection === "Create" && (
          <Appbar.Action
            icon="arrow-right"
            onPress={() => {
              const validationSelection =
                checkedOilChange ||
                checkedTuneUp ||
                checkedBreaks ||
                checkedMotor ||
                checkedElectricSystem ||
                checkedCoolingSystem ||
                checkedSuspencion ||
                checkedScan ||
                checkedAirConditioning;

              if (pageSelection === "Edit" && editRequestedService) {
                goNextAction();
              }

              if (
                pageSelection === "Create" &&
                editRequestedService === false
              ) {
                if (validationSelection && checked) {
                  let valueCheck = CheckedServiceRequested();

                  setRequestedService(
                    "",
                    valueCheck,
                    ref.current.values.Description,
                    "New",
                    checked,
                    true,
                    "",
                    ""
                  );
                  goNextAction();
                } else {
                  setDialogVisible(true);
                }
              }
            }}
            iconColor={Colors.black}
          />
        )}
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>
          View the select requested service for the vehicle
        </Text>
      </View>
      <Formik
        initialValues={DataRespondFormik()}
        onSubmit={(values) =>
          console.log("Requested Service Values on Submit:", values)
        }
        validationSchema={ValidationCustomer}
        innerRef={ref}
        enableReinitialize={initilizeData}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            behavior="padding"
            style={{ marginBottom: 24 }}
            enabled
          >
            <SafeAreaView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    marginHorizontal: 20,
                    justifyContent: "space-around",
                  }}
                >
                  <View style={styles.containerText}>
                    <View style={{ marginLeft: 30 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checkedOilChange ? "checked" : "unchecked"}
                          onPress={() => {
                            setCheckedOilChange(!checkedOilChange);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Oil Change
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checkedTuneUp ? "checked" : "unchecked"}
                          onPress={() => {
                            setCheckedTuneUp(!checkedTuneUp);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Tune Up
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checkedBreaks ? "checked" : "unchecked"}
                          onPress={() => {
                            setCheckedBreaks(!checkedBreaks);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Breaks
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checkedMotor ? "checked" : "unchecked"}
                          onPress={() => {
                            setCheckedMotor(!checkedMotor);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Motor
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={
                            checkedElectricSystem ? "checked" : "unchecked"
                          }
                          onPress={() => {
                            setCheckedElectricSystem(!checkedElectricSystem);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Electric System
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginRight: 40 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={
                            checkedCoolingSystem ? "checked" : "unchecked"
                          }
                          onPress={() => {
                            setCheckedCoolingSystem(!checkedCoolingSystem);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Cooling System
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checkedSuspencion ? "checked" : "unchecked"}
                          onPress={() => {
                            setCheckedSuspencion(!checkedSuspencion);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Suspension
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checkedScan ? "checked" : "unchecked"}
                          onPress={() => {
                            setCheckedScan(!checkedScan);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Scan
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={
                            checkedAirConditioning ? "checked" : "unchecked"
                          }
                          onPress={() => {
                            setCheckedAirConditioning(!checkedAirConditioning);
                          }}
                          disabled={disableInput}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Air Conditioning
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginVertical: 15,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        Load of the job for this service
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.black,
                              fontWeight: "bold",
                              fontSize: 15,
                            }}
                          >
                            Heavy
                          </Text>
                          <RadioButton
                            value="Heavy"
                            status={
                              checked === "Heavy" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked("Heavy")}
                            color={Colors.brightGreen}
                            disabled={disableInput}
                          />
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              color: Colors.black,
                              fontWeight: "bold",
                              fontSize: 15,
                            }}
                          >
                            Light
                          </Text>
                          <RadioButton
                            value="Light"
                            status={
                              checked === "Light" ? "checked" : "unchecked"
                            }
                            onPress={() => {
                              setChecked("Light");
                            }}
                            color={Colors.brightGreen}
                            disabled={disableInput}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginVertical: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        Specifications & Observations
                      </Text>
                      <View>
                        <TextInput
                          mode="outlined"
                          outlineColor={Colors.black}
                          activeOutlineColor={Colors.darkGreen}
                          keyboardType="default"
                          onChangeText={handleChange("Description")}
                          onBlur={handleBlur("Description")}
                          value={values.Description}
                          error={touched.Description && errors.Description}
                          multiline={true}
                          style={styles.textInputStyle}
                          disabled={disableInput}
                        />
                        <HelperText
                          type="error"
                          visible={
                            !!(touched.Description && errors.Description)
                          }
                        >
                          {errors.Description}
                        </HelperText>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          </KeyboardAvoidingView>
        )}
      </Formik>
      {dialogVisible && (
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="alert-circle-outline"
              size={80}
              color={Colors.darkRed}
            />
            <Dialog.Title style={styles.textAlert}>Invalid Inputs</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                There are missing required or need to correct information.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                textColor={Colors.yellowDark}
                onPress={() => setDialogVisible(false)}
              >
                Okay
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  instruction: {
    fontWeight: "400",
    color: Colors.black,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  containerKey: {
    flex: 1,
  },
  navBtnsPosition: {
    width: 540,
    height: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navCancelBtn: { marginRight: 10 },
  navNextBtn: { marginLeft: 10 },
  header: {
    backgroundColor: Colors.yellowDark,
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
  textAlert: {
    textAlign: "center",
  },
});

export default RequestedService;
