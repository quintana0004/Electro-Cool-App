import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ToastAndroid,
} from "react-native";
import { Appbar, ActivityIndicator } from "react-native-paper";
import Colors from "../../../../constants/Colors/Colors";
import { Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";
import {
  useVehicleInfoStore,
  CBCustomerInfoStore,
} from "../../../../Store/JobOrderStore";
import { Button, Dialog, Portal } from "react-native-paper";
import ErrorOverlay from "../../../../components/UI/ErrorOverlay";
import { httpGetCar, httpUpsertCar } from "../../../../api/cars.api";
import { useInfiniteQuery } from "@tanstack/react-query";

const ValidationCustomer = Yup.object().shape({
  Brand: Yup.string()
    .required("Brand is required.")
    .matches("^[A-Za-z ]{2,50}$", "Must Contain Only Letters."),
  LicensePlate: Yup.string()
    .required("License Plate is required.")
    .min(6, "Must be 6 to 8 Characters Long")
    .max(8, "Must be 6 to 8 Characters Long")
    .matches("^[A-Z0-9]{6,8}$", "Only Upper Case Letters and Numbers."),
  Model: Yup.string().required("Model is required."),
  Year: Yup.string()
    .required("Year is required.")
    .length(4, "Must be 4 Digits")
    .matches("^[12][0-9]{3}$", "Year is incorrect."),
  ColorVehicle: Yup.string()
    .required("Color is required.")
    .matches("^[A-Za-z ]{2,50}$", "Color can't contain Numbers."),
  Milage: Yup.string()
    .required("Milage is required.")
    .min(2, "Musto contain more than 2 Digits")
    .matches("^[0-9]{1,6}$", "Must Contain Only Numbers."),
  VinNumber: Yup.string()
    .required("Vin Number is required.")
    .length(17, "Must Contain 17 Characters")
    .matches("^[A-HJ-NPR-Z0-9]{17}$", "Only Upper Case Letters and Numbers."),
  Description: Yup.string(),
});

function CarModal({ activateModal, setSearchIcon }) {
  //Store Hooks
  const id = useVehicleInfoStore((state) => state.id);
  const customerId = CBCustomerInfoStore((state) => state.id);
  const setVehicleInformation = useVehicleInfoStore(
    (state) => state.setVehicleInformation
  );
  const setReloadClientBookCarList = CBCustomerInfoStore(
    (state) => state.setReloadClientBookCarList
  );
  const setReloadClientBookCarInfo = CBCustomerInfoStore(
    (state) => state.setReloadClientBookCarInfo
  );
  const reloadClientBookCarInfo = CBCustomerInfoStore(
    (state) => state.reloadClientBookCarInfo
  );

  const [dialogVisible, setDialogVisible] = useState(false);
  const ref = useRef(null);
  const [vehicleData, setVehicleData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [initilizeData, setInitializeData] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  const { data, isError, error, isFetching } = useInfiniteQuery({
    queryKey: ["ClientBookCarSelected", reloadClientBookCarInfo],
    queryFn: getClientBookScreenData,
    enabled: true,
  });

  async function getClientBookScreenData() {
    setErrorMessage("Error loading Car Infomation. Please try again later.");
    setInitializeData(true);
    setDisableInput(true);
    let vehicleInfo = await httpGetCar(id);
    setVehicleData(vehicleInfo);
    return data;
  }

  function errorHandler() {
    setErrorMessage(null);
    setReloadClientBookCarInfo();
  }

  if (isError) {
    return (
      <View
        style={{
          backgroundColor: "white",
          margin: 30,
          borderRadius: 20,
          marginHorizontal: 60,
        }}
      >
        <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />
      </View>
    );
  }

  if (isFetching) {
    return <ActivityIndicator size={"large"} color={Colors.brightYellow} />;
  }
  //Update the data of the Client
  async function handleUpdateCar() {
    let info = {
      id: id,
      brand: ref.current.values.Brand,
      licensePlate: ref.current.values.LicensePlate,
      model: ref.current.values.Model,
      year: ref.current.values.Year,
      mileage: ref.current.values.Milage,
      color: ref.current.values.ColorVehicle,
      vinNumber: ref.current.values.VinNumber,
      customerId: customerId,
    };
    try {
      const infoCar = await httpUpsertCar(info);
      showSuccessMessage();
      setReloadClientBookCarList();
    } catch (error) {
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
        Brand: vehicleData.data.brand,
        LicensePlate: vehicleData.data.licensePlate,
        Model: vehicleData.data.model,
        Year: vehicleData.data.year,
        ColorVehicle: vehicleData.data.color,
        Milage: vehicleData.data.mileage,
        VinNumber: vehicleData.data.vinNumber,
        Description: vehicleData.data.carItemsDescription,
      };
    } else {
      dataPassed = {
        Brand: "",
        LicensePlate: "",
        Model: "",
        Year: "",
        ColorVehicle: "",
        Milage: "",
        VinNumber: "",
        Description: "",
      };
    }

    return dataPassed;
  }

  function goBackPageAction() {
    setSearchIcon(true);
    activateModal(false);
  }
  function savePress() {
    if (ref.current && ref.current.isValid) {
      setVehicleInformation(
        id,
        ref.current.values.Brand,
        ref.current.values.LicensePlate,
        ref.current.values.Model,
        ref.current.values.Year,
        ref.current.values.Milage,
        ref.current.values.ColorVehicle,
        ref.current.values.VinNumber,
        customerId
      );
      handleUpdateCar();
      setSaveData(!saveData);
      setDisableInput(true);
      activateModal(false);
    } else {
      setDialogVisible(true);
    }
  }
  return (
    <View style={styles.modalContainer}>
      <View>
        <Appbar.Header style={styles.header} mode="center-aligned">
          <Appbar.BackAction
            icon="close"
            onPress={() => {
              goBackPageAction();
            }}
          />
          <Appbar.Content title="Vehicle Information"></Appbar.Content>
          {saveData === false && (
            <Appbar.Action
              icon="square-edit-outline"
              onPress={() => {
                setSaveData(!saveData);
                setDisableInput(false);
              }}
              iconColor={Colors.black}
            />
          )}
          {saveData === true && (
            <Appbar.Action
              icon="content-save"
              onPress={async () => {
                savePress();
              }}
              iconColor={Colors.black}
            />
          )}
        </Appbar.Header>
      </View>
      <Formik
        initialValues={DataRespondFormik()}
        onSubmit={(values) =>
          console.log("Vehicle Information Values on Submit: ", values)
        }
        validationSchema={ValidationCustomer}
        innerRef={ref}
        enableReinitialize={initilizeData}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={220}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  justifyContent: "space-around",
                  margin: 10,
                }}
              >
                <View style={[styles.containerText]}>
                  <View style={{ width: 220, marginBottom: 15 }}>
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
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.Brand && errors.Brand)}
                    >
                      {errors.Brand}
                    </HelperText>
                  </View>
                  <View style={{ width: 250, marginBottom: 15 }}>
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
                      disabled={disableInput}
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: 170, marginBottom: 15 }}>
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
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.Model && errors.Model)}
                    >
                      {errors.Model}
                    </HelperText>
                  </View>
                  <View style={{ width: 120, marginBottom: 15 }}>
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
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.Year && errors.Year)}
                    >
                      {errors.Year}
                    </HelperText>
                  </View>
                  <View style={{ width: 200, marginBottom: 15 }}>
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
                      disabled={disableInput}
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
                  <View style={{ width: 200, marginBottom: 15 }}>
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
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.Milage && errors.Milage)}
                    >
                      {errors.Milage}
                    </HelperText>
                  </View>
                  <View style={{ width: 250, marginBottom: 15 }}>
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
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.VinNumber && errors.VinNumber)}
                    >
                      {errors.VinNumber}
                    </HelperText>
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

  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
  textAlert: {
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 2,
    width: 550,
    alignSelf: "center",
  },
});

export default CarModal;
