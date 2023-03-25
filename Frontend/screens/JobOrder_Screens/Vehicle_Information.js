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
import { TextInput, HelperText, RadioButton } from "react-native-paper";
import * as Yup from "yup";
import { useVehicleInfoStore } from "../../Store/store";
import { StackActions } from "@react-navigation/native";

const ValidationCustomer = Yup.object().shape({
  Brand: Yup.string()
    .required("Brand is required.")
    .matches("^[A-Za-z]{2,50}$", "Brand can't contain digits."),
  LicensePlate: Yup.string()
    .required("License Plate is required.")
    .matches("^[A-Z0-9]{6,8}$", "License Plate can't contain symbols."),
  Model: Yup.string().required("Model is required."),
  Year: Yup.string()
    .required("Year is required")
    .matches("^(19|20)d{2}$", "Year is incorrect."),
  ColorVehicle: Yup.string()
    .required("Color is required.")
    .matches("^[A-Za-z]{2,50}$", "Color can't contain digits."),
  Milage: Yup.string()
    .required("Milage is required.")
    .matches("^[0-9]{1,6}$", "Milage can't contain symbols, space or comma."),
  VinNumber: Yup.string()
    .required("Vin Number is required.")
    .matches("^[A-HJ-NPR-Z0-9]{17}$", "Vin Number must contain 17 characters."),
  Description: Yup.string(),
});

function VehicleInformation({ route, navigation }) {
  //funtions that will navigate the stack
  //?Home
  function goBackHome() {
    const pageGoHome = StackActions.popToTop("JobOrderMain");
    navigation.dispatch(pageGoHome);
  }

  //?Go Back
  function goBackPageAction() {
    const pageGoBackAction = StackActions.pop(1);
    navigation.dispatch(pageGoBackAction);
  }

  //?Next
  function goNextPageAction() {
    const pageGoNext = StackActions.push("RequestedService");
    navigation.dispatch(pageGoNext);
  }

  const [checked, setChecked] = useState("No");
  const [height, setHeight] = useState(undefined);

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            goBackPageAction();
          }}
        />
        <Appbar.Content title="Vehicle Information"></Appbar.Content>
        <Appbar.Action
          icon="home"
          onPress={() => goBackHome()}
          iconColor={Colors.black}
        />
        <Appbar.Action
          icon="arrow-right"
          onPress={() => goNextPageAction()}
          iconColor={Colors.black}
        />
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>Enter new vehicle information</Text>
      </View>
      <Formik
        initialValues={{
          Brand: "",
          LicensePlate: "",
          Model: "",
          Year: "",
          ColorVehicle: "",
          Milage: "",
          VinNumber: "",
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
                    <View style={{ width: 250 }}>
                      <TextInput
                        label="Brand"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("Brand")}
                        onBlur={handleBlur("Brand")}
                        value={values.Brand}
                        error={touched.Brand && errors.Brand}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.Brand && errors.Brand)}
                      >
                        {errors.Brand}
                      </HelperText>
                    </View>
                    <View style={{ width: 260 }}>
                      <TextInput
                        label="License Plate"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("LicensePlate")}
                        onBlur={handleBlur("LicensePlate")}
                        value={values.LicensePlate}
                        error={touched.LicensePlate && errors.LicensePlate}
                      />
                      <HelperText
                        type="error"
                        visible={
                          !!(touched.LicensePlate && errors.LicensePlate)
                        }
                      >
                        {errors.LicensePlate}
                      </HelperText>
                    </View>
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: 200 }}>
                      <TextInput
                        label="Model"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("Model")}
                        onBlur={handleBlur("Model")}
                        value={values.Model}
                        error={!!(touched.Model && errors.Model)}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.Model && errors.Model)}
                      >
                        {errors.Model}
                      </HelperText>
                    </View>
                    <View style={{ width: 150 }}>
                      <TextInput
                        label="Year"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("Year")}
                        onBlur={handleBlur("Year")}
                        value={values.Year}
                        error={!!(touched.Year && errors.Year)}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.Year && errors.Year)}
                      >
                        {errors.Year}
                      </HelperText>
                    </View>
                    <View style={{ width: 170 }}>
                      <TextInput
                        label="Color"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("ColorVehicle")}
                        onBlur={handleBlur("ColorVehicle")}
                        value={values.ColorVehicle}
                        error={!!(touched.ColorVehicle && errors.ColorVehicle)}
                      />
                      <HelperText
                        type="error"
                        visible={
                          !!(touched.ColorVehicle && errors.ColorVehicle)
                        }
                      >
                        {errors.ColorVehicle}
                      </HelperText>
                    </View>
                  </View>
                  <View style={styles.containerText}>
                    <View style={{ width: 200 }}>
                      <TextInput
                        label="Milage"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("Milage")}
                        onBlur={handleBlur("Milage")}
                        value={values.Milage}
                        error={touched.Milage && errors.Milage}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.Milage && errors.Milage)}
                      >
                        {errors.Milage}
                      </HelperText>
                    </View>
                    <View style={{ width: 260 }}>
                      <TextInput
                        label="Vin Number"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("VinNumber")}
                        onBlur={handleBlur("VinNumber")}
                        value={values.VinNumber}
                        error={touched.VinNumber && errors.VinNumber}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.VinNumber && errors.VinNumber)}
                      >
                        {errors.VinNumber}
                      </HelperText>
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
                        Does the vehicle contain any object of value ?
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
                            Yes
                          </Text>
                          <RadioButton
                            value="Yes"
                            status={checked === "Yes" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Yes")}
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
                            No
                          </Text>
                          <RadioButton
                            value="No"
                            status={checked === "No" ? "checked" : "unchecked"}
                            onPress={() => {
                              setChecked("No");
                              values.Description = "";
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
                        If yes, what object of value is left in the car?
                      </Text>
                      <View>
                        <TextInput
                          label="Description"
                          mode="outlined"
                          outlineColor={Colors.black}
                          activeOutlineColor={Colors.darkGreen}
                          keyboardType="default"
                          onChangeText={handleChange("Description")}
                          onBlur={handleBlur("Description")}
                          value={values.Description}
                          error={touched.Description && errors.Description}
                          disabled={checked === "No"}
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

export default VehicleInformation;
