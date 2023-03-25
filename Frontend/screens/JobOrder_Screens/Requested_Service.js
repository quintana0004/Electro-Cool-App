import React, { useState } from "react";
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
import { useRequestedServiceStore } from "../../Store/store";
import { StackActions } from "@react-navigation/native";

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

  const [height, setHeight] = useState(undefined);

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            goBackAction();
          }}
        />
        <Appbar.Content title="Requested Service"></Appbar.Content>
        <Appbar.Action
          icon="home"
          onPress={() => goHomeAction()}
          iconColor={Colors.black}
        />
        <Appbar.Action
          icon="arrow-right"
          onPress={() => goNextAction()}
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
                    <View style={{ marginRight: 30 }}>
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
                          multiline
                          onContentSizeChange={(event) => {
                            setHeight(event.nativeEvent.contentSize.height);
                          }}
                          style={{ height: height }}
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
});

export default RequestedService;
