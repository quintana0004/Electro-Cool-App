import React, { useRef, useState } from "react";
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

import Colors from "../../../../constants/Colors/Colors";
import { Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";
import { CBCustomerInfoStore } from "../../../../Store/JobOrderStore";
import { Button, Dialog, Portal } from "react-native-paper";
import { httpUpsertClient } from "../../../../api/clients.api";

const ValidationCustomer = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "Must contain only letters."),
  lastName: Yup.string()
    .required("Last Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "Must contain only letters."),
  phoneNumber: Yup.string()
    .required("Phone Number  is required.")
    .matches(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "Most contain only Numbers Ex. 123-456-7890 "
    ),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid Email Address."),
});

function CustomerItemCB({ onUpdateFullName }) {
  const setReloadClientBookList = CBCustomerInfoStore(
    (state) => state.setReloadClientBookList
  );
  const customerData = CBCustomerInfoStore((state) => {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      phone: state.phone,
      email: state.email,
      date: state.date,
    };
  });

  //Other Hooks
  const [dialogVisible, setDialogVisible] = useState(false);
  const ref = useRef(null);
  const [saveData, setSaveData] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);

  function DataRespondFormik() {
    let dataPassed;

    dataPassed = {
      id: customerData.id,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      phoneNumber: customerData.phone,
      email: customerData.email,
    };

    return dataPassed;
  }

  //Update the data of the Client
  async function handleUpdateClient() {
    let info = {
      id: customerData.id,
      firstName: ref.current.values.firstName,
      lastName: ref.current.values.lastName,
      phone: ref.current.values.phoneNumber,
      email: ref.current.values.email,
    };

    try {
      const clientData = await httpUpsertClient(info);
      showSuccessMessage();
      setReloadClientBookList();
      onUpdateFullName(info.firstName, info.lastName);
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

  return (
    <View
      style={{
        margin: 20,
        backgroundColor: "#F7F7F7",
        borderColor: "#e3e1e1",
        borderWidth: 2,
      }}
    >
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.Content title="Customer Information"></Appbar.Content>
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
              if (ref.current && ref.current.isValid) {
                handleUpdateClient();
                setSaveData(!saveData);
                setDisableInput(true);
              } else {
                setDialogVisible(true);
              }
            }}
            iconColor={Colors.black}
          />
        )}
      </Appbar.Header>

      <Formik
        initialValues={DataRespondFormik()}
        onSubmit={(values) => console.log(values)}
        validationSchema={ValidationCustomer}
        innerRef={ref}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={200}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  justifyContent: "space-around",
                  marginHorizontal: 20,
                }}
              >
                <View style={styles.containerText}>
                  <View style={{ width: 220 }}>
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
                  <View style={{ width: 260 }}>
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
                  <View style={{ marginVertical: 15 }}>
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
                  <View style={{ marginVertical: 15 }}>
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
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginVertical: 15,
  },
  textAlert: {
    textAlign: "center",
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
});

export default CustomerItemCB;
