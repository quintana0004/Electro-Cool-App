import * as Yup from "yup";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from "react-native-paper";
import { Formik } from "formik";
import Colors from "../../constants/Colors/Colors";
import Figures from "../../constants/figures/Figures";
import React, { useRef, useState } from "react";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";

const ValidationInfo = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "First name can't have digits."),
  lastName: Yup.string()
    .required("Last Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "Last name can't have digits."),
  phoneNumber: Yup.string().required("Phone Number  is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid Email Address."),
});

function AccountInformationForm({ setPage }) {
  const setCustomerInfo = useCustomerInfoStore(
    (state) => state.setCustomerInfo
  );

  const refInformation = useRef(null);
  const [visibilityInfo, setVisibilityInfo] = useState(false);

  function handleAccountInformationValidation() {
    // Start to validating there is no error on input page
    const TouchedObject =
      Object.keys(refInformation.current.touched).length > 0;

    if (
      refInformation.current &&
      refInformation.current.isValid &&
      TouchedObject
    ) {
      setCustomerInfo(
        "",
        refInformation.current.values.firstName,
        refInformation.current.values.lastName,
        refInformation.current.values.phoneNumber,
        refInformation.current.values.email
      );
      setPage(1);
    } else {
      setVisibilityInfo(true);
    }
  }

  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Avatar.Icon
          size={50}
          icon="information"
          color="#FFFFFF"
          style={{ backgroundColor: "#363636" }}
        />
        <Text style={{ fontSize: 15, fontWeight: "500" }}>Information</Text>
      </View>
      <Formik
        validationSchema={ValidationInfo}
        innerRef={refInformation}
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
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
                  <View style={{ marginVertical: 20 }}>
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
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.phoneNumber && errors.phoneNumber)}
                    >
                      {errors.phoneNumber}
                    </HelperText>
                  </View>
                  <View style={{ marginVertical: 20 }}>
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
      <View>
        <Pressable
          onPress={handleAccountInformationValidation}
          style={{
            backgroundColor: "#222831",
            padding: 15,
            marginRight: 10,
            marginTop: 20,
            marginLeft: 470,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 20,
              fontWeight: "500",
              marginRight: 20,
            }}
          >
            Next
          </Text>
          <Image
            source={Figures.Arrow}
            style={{
              width: 10,
              height: 20,
              transform: [{ rotate: "180deg" }],
            }}
          />
        </Pressable>
      </View>
      {visibilityInfo && (
        <Portal>
          <Dialog
            visible={visibilityInfo}
            onDismiss={() => setVisibilityInfo(false)}
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
                onPress={() => setVisibilityInfo(false)}
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

export default AccountInformationForm;

const styles = StyleSheet.create({
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  textAlert: {
    textAlign: "center",
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
});
