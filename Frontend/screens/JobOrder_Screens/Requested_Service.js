import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
} from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";

const ValidationCustomer = Yup.object().shape({
  Description: Yup.string(),
});

function RequestedService({ navigation }) {
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
    const pageAction = StackActions.push("CompanyPolicy");
    navigation.dispatch(pageAction);
  }

  const ref = useRef(null);

  const setRequestedService = useRequestedServiceStore(
    (state) => state.setRequestedService
  );

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

    console.log("Value State: ", valueChecked.join(";"));

    return valueChecked.join(";");
  }

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

  //Check the page selection for both the options
  const pageSelection = useJobOrderStore((state) => state.pageSelection);
  const editRequestedService = useJobOrderStore(
    (state) => state.editRequestedService
  );

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            goBackAction();
          }}
        />
        {editRequestedService && (
          <Appbar.Action
            icon="square-edit-outline"
            onPress={() => console.log("EDIT ICON")}
            iconColor={Colors.black}
          />
        )}
        <Appbar.Content title="Requested Service"></Appbar.Content>
        <Appbar.Action
          icon="home"
          onPress={() => goHomeAction()}
          iconColor={Colors.black}
        />
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

            if (pageSelection === "Create" && editRequestedService === false) {
              if (validationSelection && checked) {
                let valueCheck = CheckedServiceRequested();
                console.log("VALUE CHECK: ", valueCheck);
                setRequestedService(
                  "",
                  valueCheck,
                  ref.current.values.Description,
                  "New",
                  checked,
                  true, // MOCHA COMMENT: Why was this hardcoded to false? Aren't you suppose to be grabbing what the user selected when checking the Policy signature?
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
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>
          View the select requested service for the vehicle
        </Text>
      </View>
      <Formik
        initialValues={{
          Description: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={ValidationCustomer}
        innerRef={ref}
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
                        Especification & Observations
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
  header: {
    backgroundColor: Colors.darkGreen,
  },
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
