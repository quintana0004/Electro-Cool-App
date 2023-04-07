import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";
import {
  useCustomerInfoStore,
  useJobOrderStore,
} from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { MaskedText, MaskedTextInput } from "react-native-mask-text";
import { httpGetClient, httpUpsertClient } from "../../api/clients.api";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const ValidationCustomer = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required.")
    .matches("^[A-Za-z]{2,50}$", "First name can't have digits."),
  lastName: Yup.string("No digits, only letters are valid.")
    .required("Last Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "Last name can't have digits."),
  phoneNumber: Yup.string().required("Phone Number  is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid Email Address."),
});

function ClientInformation({ route, navigation }) {
  //Store Hooks
  const setCustomerInfo = useCustomerInfoStore(
    (state) => state.setCustomerInfo
  );
  const id = useCustomerInfoStore((state) => state.id);
  const pageSelection = useJobOrderStore((state) => state.pageSelection);
  const editClientInformation = useJobOrderStore(
    (state) => state.editClientInformation
  );

  //Other Hooks
  const [dialogVisible, setDialogVisible] = useState(false);
  const ref = useRef(null);
  const [clientData, setClientData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const [initilizeData, setInitializeData] = useState(false);
  const [disableInput, setDisableInput] = useState();

  //Use Effect Hook to get the data
  useEffect(() => {
    async function handleGetClientInfo() {
      try {
        const clientInfo = await httpGetClient(id);
        setClientData(clientInfo);
      } catch (error) {
        setErrorMessage("Could not fetch customer information.");
      }
      setIsFetching(false);
      setInitializeData(true);
    }

    if (editClientInformation) {
      handleGetClientInfo();
    } else {
      setIsFetching(false);
    }
  }, [editClientInformation]);

  function errorHandler() {
    setErrorMessage(null);
  }

  if (errorMessage && !isFetching) {
    return <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  function DataRespondFormik() {
    let dataPassed;

    if (initilizeData) {
      dataPassed = {
        firstName: clientData.data.fullName,
        lastName: clientData.data.lastName,
        phoneNumber: clientData.data.phone,
        email: clientData.data.email,
      };
      setDisableInput(true);
    } else {
      dataPassed = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      };
      setDisableInput(false);
    }

    return dataPassed;
  }

  //Update the data of the Client
  async function handleUpdateClient() {
    let info = {
      id: id,
      firstName: ref.current.values.firstName,
      lastName: ref.current.values.lastName,
      phone: ref.current.values.phoneNumber,
      email: ref.current.values.email,
    };
    console.log("INFO DATA: ", info);
    try {
      const clientData = await httpUpsertClient(info);
      showSuccessMessage();
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

  //Navigation of the page
  //?Home
  function goHome() {
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  //?Next
  function goNext() {
    const pageAction = StackActions.push("CarSelection");
    navigation.dispatch(pageAction);
  }

  function goNextOption() {
    const pageAction = StackActions.push("VehicleInformation");
    navigation.dispatch(pageAction);
  }

  //?Go Back
  function goBackPage() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            goBackPage();
          }}
        />
        {editClientInformation === true && saveData === false && (
          <Appbar.Action
            icon="square-edit-outline"
            onPress={() => {
              setSaveData(!saveData);
              setDisableInput(false);
            }}
            iconColor={Colors.black}
          />
        )}
        {editClientInformation === true && saveData === true && (
          <Appbar.Action
            icon="content-save"
            onPress={async () => {
              handleUpdateClient();
              setSaveData(!saveData);
              setDisableInput(true);
            }}
            iconColor={Colors.black}
          />
        )}
        <Appbar.Content title="Customer Information"></Appbar.Content>
        <Appbar.Action
          icon="home"
          onPress={() => goHome()}
          iconColor={Colors.black}
        />
        <Appbar.Action
          icon="arrow-right"
          onPress={() => {
            const TouchedObject = Object.keys(ref.current.touched).length > 0;

            if (pageSelection === "Edit" && editClientInformation) {
              goNextOption();
            }

            if (pageSelection === "Create" && editClientInformation === false) {
              if (ref.current && ref.current.isValid && TouchedObject) {
                setCustomerInfo(
                  "",
                  ref.current.values.firstName,
                  ref.current.values.lastName,
                  ref.current.values.phoneNumber,
                  ref.current.values.email
                );
                goNext();
              } else {
                setDialogVisible(true);
              }
            }
          }}
          iconColor={Colors.black}
        />
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>Enter new customer information</Text>
      </View>
      <Formik
        initialValues={DataRespondFormik()}
        onSubmit={(values) => console.log(values)}
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
            enabled
            keyboardVerticalOffset={-100}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  justifyContent: "space-around",
                  paddingBottom: 24,
                  marginHorizontal: 20,
                }}
              >
                <View style={styles.containerText}>
                  <View style={{ width: 250 }}>
                    <TextInput
                      label="First Name"
                      mode="outlined"
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                      error={touched.firstName && errors.firstName}
                      style={styles.textInputStyle}
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.firstName && errors.firstName)}
                    >
                      {errors.firstName}
                    </HelperText>
                  </View>
                  <View style={{ width: 280 }}>
                    <TextInput
                      label="Last Name"
                      mode="outlined"
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                      error={touched.lastName && errors.lastName}
                      style={styles.textInputStyle}
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.lastName && errors.lastName)}
                    >
                      {errors.lastName}
                    </HelperText>
                  </View>
                </View>
                <View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="Phone Number"
                      mode="outlined"
                      left={
                        <TextInput.Icon
                          icon="phone"
                          color={Colors.lightGreyDark}
                        />
                      }
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="phone-pad"
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      value={values.phoneNumber}
                      error={touched.phoneNumber && errors.phoneNumber}
                      style={styles.textInputStyle}
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.phoneNumber && errors.phoneNumber)}
                    >
                      {errors.phoneNumber}
                    </HelperText>
                  </View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="E-mail Address"
                      mode="outlined"
                      left={
                        <TextInput.Icon
                          icon="email"
                          color={Colors.lightGreyDark}
                        />
                      }
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      error={touched.email && errors.email}
                      style={styles.textInputStyle}
                      disabled={disableInput}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.email && errors.email)}
                    >
                      {errors.email}
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
    marginVertical: 30,
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
  textAlert: {
    textAlign: "center",
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
});

export default ClientInformation;
