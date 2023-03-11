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
import NavBtn from "../../components/UI/NavBtns";

const ValidationCustomer = Yup.object().shape({
  Description: Yup.string(),
});

function RequestedService({ navigation }) {
  const [checked, setChecked] = useState("No");
  const [height, setHeight] = useState(undefined);

  function navNext() {
    navigation.navigate("CompanyPolicy");
  }

  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Requested Service"></Appbar.Content>
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
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
                          status={checked ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked(!checked);
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
      <View style={styles.navBtnsPosition}>
        <View style={styles.navCancelBtn}>
          <NavBtn choice={"Cancel"} nav={navJobOrder} />
        </View>
        <View style={styles.navNextBtn}>
          <NavBtn choice={"Next"} nav={navNext} />
        </View>
      </View>
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
