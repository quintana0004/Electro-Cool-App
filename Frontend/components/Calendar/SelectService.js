import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { Formik } from "formik";
import { Checkbox } from "react-native-paper";
import * as Yup from "yup";
import {
  useRequestedServiceStore,
  useJobOrderStore,
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";
import { httpGetJobOrder, httpUpsertJobOrder } from "../../api/jobOrders.api";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const ValidationCustomer = Yup.object().shape({
  Description: Yup.string(),
});

function RequestedService({ onCheck }) {
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

  //? home

  const ref = useRef(null);

  function CheckedServiceRequested() {
    let valueChecked = [];

    if (checkedOilChange) {
      valueChecked.push("OilChange");
    }

    if (checkedTuneUp) {
      valueChecked.push("TuneUp");
    }

    if (checkedBreaks) {
      valueChecked.push("Breaks");
    }

    if (checkedMotor) {
      valueChecked.push("Motor");
    }

    if (checkedElectricSystem) {
      valueChecked.push("ElectricSystem");
    }

    if (checkedCoolingSystem) {
      valueChecked.push("CoolingSystem");
    }

    if (checkedSuspencion) {
      valueChecked.push("Suspencion");
    }

    if (checkedScan) {
      valueChecked.push("Scan");
    }

    if (checkedAirConditioning) {
      valueChecked.push("AirConditioning");
    }

    return valueChecked.join(";");
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
    return <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />;
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

      <Appbar.Action
        onPress={() => {
          checkedOilChange ||
            checkedTuneUp ||
            checkedBreaks ||
            checkedMotor ||
            checkedElectricSystem ||
            checkedCoolingSystem ||
            checkedSuspencion ||
            checkedScan ||
            checkedAirConditioning;
        }}
        iconColor={Colors.black}
      />

      <View>
        <Formik
          initialValues={DataRespondFormik()}
          onSubmit={(values) =>
            console.log("Requested Service Values on Submit:", values)
          }
          validationSchema={ValidationCustomer}
          innerRef={ref}
          enableReinitialize={initilizeData}
        >
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
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkGreen,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
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
