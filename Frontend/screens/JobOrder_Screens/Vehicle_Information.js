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
import { TextInput, HelperText, RadioButton } from "react-native-paper";
import * as Yup from "yup";
import { useVehicleInfoStore } from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";

const ValidationCustomer = Yup.object().shape({
  Brand: Yup.string()
    .required("Brand is required.")
    .matches("^[A-Za-z]{2,50}$", "Brand can't contain digits."),
  LicensePlate: Yup.string()
    .required("License Plate is required.")
    .matches("^[A-Z0-9]{6,8}$", "License Plate can't contain symbols."),
  Model: Yup.string().required("Model is required."),
  Year: Yup.string()
    .required("Year is required.")
    .matches("^[12][0-9]{3}$", "Year is incorrect."),
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

  const setVehicleInformation = useVehicleInfoStore(
    (state) => state.setVehicleInformation
  );

  const [checked, setChecked] = useState("No");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [touchedDescription, setTouchedDescription] = useState(false);

  const ref = useRef(null);

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
          onPress={() => {
            const TouchedObject = Object.keys(ref.current.touched).length > 0;

            if (ref.current && ref.current.isValid && TouchedObject) {
              setVehicleInformation(
                "",
                ref.current.values.Brand,
                ref.current.values.LicensePlate,
                ref.current.values.Model,
                ref.current.values.ColorVehicle,
                ref.current.values.VinNumber,
                checked,
                ref.current.values.Description,
                ""
              );
              goNextPageAction();
            } else {
              setDialogVisible(true);
            }
          }}
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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={-100}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  marginHorizontal: 20,
                  justifyContent: "space-around",
                }}
              >
                <View style={[styles.containerText]}>
                  <View style={{ width: 280 }}>
                    <TextInput
                      label="Brand"
                      mode="outlined"
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.darkGreen}
                      keyboardType="default"
                      onChangeText={handleChange("Brand")}
                      onBlur={handleBlur("Brand")}
                      value={values.Brand}
                      error={touched.Brand && errors.Brand}
                      style={styles.textInputStyle}
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
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("LicensePlate")}
                      onBlur={handleBlur("LicensePlate")}
                      value={values.LicensePlate}
                      error={touched.LicensePlate && errors.LicensePlate}
                      style={styles.textInputStyle}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.LicensePlate && errors.LicensePlate)}
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
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("Model")}
                      onBlur={handleBlur("Model")}
                      value={values.Model}
                      error={!!(touched.Model && errors.Model)}
                      style={styles.textInputStyle}
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
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("Year")}
                      onBlur={handleBlur("Year")}
                      value={values.Year}
                      error={!!(touched.Year && errors.Year)}
                      style={styles.textInputStyle}
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
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("ColorVehicle")}
                      onBlur={handleBlur("ColorVehicle")}
                      value={values.ColorVehicle}
                      error={!!(touched.ColorVehicle && errors.ColorVehicle)}
                      style={styles.textInputStyle}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.ColorVehicle && errors.ColorVehicle)}
                    >
                      {errors.ColorVehicle}
                    </HelperText>
                  </View>
                </View>
                <View style={[styles.containerText]}>
                  <View style={{ width: 230 }}>
                    <TextInput
                      label="Milage"
                      mode="outlined"
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("Milage")}
                      onBlur={handleBlur("Milage")}
                      value={values.Milage}
                      error={touched.Milage && errors.Milage}
                      style={styles.textInputStyle}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.Milage && errors.Milage)}
                    >
                      {errors.Milage}
                    </HelperText>
                  </View>
                  <View style={{ width: 300 }}>
                    <TextInput
                      label="Vin Number"
                      mode="outlined"
                      outlineColor={Colors.lightGreyDark}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("VinNumber")}
                      onBlur={handleBlur("VinNumber")}
                      value={values.VinNumber}
                      error={touched.VinNumber && errors.VinNumber}
                      style={styles.textInputStyle}
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
                          No
                        </Text>
                        <RadioButton
                          value="No"
                          status={checked === "No" ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked("No");
                            values.Description = "";
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
                        marginBottom: 10,
                        marginTop: 10,
                      }}
                    >
                      If yes, what object of value is left in the car?
                    </Text>
                    <View
                      style={{
                        height: touchedDescription ? 160 : 2,
                      }}
                    >
                      <TextInput
                        label="Description"
                        mode="outlined"
                        outlineColor={Colors.lightGreyDark}
                        activeOutlineColor={Colors.brightGreen}
                        keyboardType="default"
                        onChangeText={handleChange("Description")}
                        onBlur={handleBlur("Description")}
                        value={values.Description}
                        error={touched.Description && errors.Description}
                        disabled={checked === "No"}
                        numberOfLines={3}
                        style={[styles.textInputStyle]}
                        onPressIn={() => setTouchedDescription(true)}
                        onPressOut={() => {
                          setTouchedDescription(false);
                        }}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.Description && errors.Description)}
                      >
                        {errors.Description}
                      </HelperText>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
  descriptionText: {},
});

export default VehicleInformation;
