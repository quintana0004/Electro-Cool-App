import * as Yup from "yup";
import {
  Alert,
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
import React, { useRef, useState } from "react";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";
import { httpSignup } from "../../api/auth.api";
import { storeTokens } from "../../Store/secureStore";

const ValidationUser = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      "^[A-Za-z0-9]{2,50}$",
      "Username must contain letters and digits."
    ),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      "^[A-Za-z0-9@._]{8,50}$",
      "Password must contain letters, digits and special character. Need a eight charaters or more."
    ),
  passwordConfirm: Yup.string()
    .required("Password Confirm is required.")
    .matches(
      "^[A-Za-z0-9@._]{8,50}$",
      "Password must contain letters, digits and special character. Need a eight charaters or more."
    ),
});

function AccountCredentialsForm({ setVisibilityAccountConfirm }) {
  const customerInfo = useCustomerInfoStore((state) => ({
    email: state.email,
    firstName: state.firstName,
    lastName: state.lastName,
    phone: state.phone,
  }));

  const refAccount = useRef(null);
  const [visibilityUser, setVisibilityUser] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  function handleCredentialValidation() {
    // Start to validating there is no error on input page
    const TouchedObject = Object.keys(refAccount.current.touched).length > 0;

    if (
      refAccount.current.values.password !==
      refAccount.current.values.passwordConfirm
    ) {
      setErrorMSG("Both passwords must be the same");
      setVisibilityUser(true);
      return false;
    }
    if (!refAccount.current && !refAccount.current.isValid && !TouchedObject) {
      setErrorMSG("There are missing required or need to correct information.");
      setVisibilityUser(true);
      return false;
    }

    return true;
  }

  async function handleCreateAccount() {
    const isValid = handleCredentialValidation();
    if (isValid === false) return;

    const response = await httpSignup(
      customerInfo.email,
      refAccount.current.values.password,
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.phone,
      refAccount.current.values.username
    );
    if (response.hasError) {
      return Alert.alert(
        "Error",
        "There was an error during authentication. Please try again later."
      );
    }

    await storeTokens(response.data.accessToken, response.data.refreshToken);
    setVisibilityAccountConfirm(true);
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
          icon="account-circle"
          color="#FFFFFF"
          style={{ backgroundColor: "#363636" }}
        />
        <Text style={{ fontSize: 15, fontWeight: "500" }}>Account</Text>
      </View>
      <Formik
        validationSchema={ValidationUser}
        innerRef={refAccount}
        initialValues={{
          username: "",
          password: "",
          passwordConfirm: "",
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
                <View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="Username"
                      mode="outlined"
                      left={
                        <TextInput.Icon
                          icon="account-outline"
                          color={Colors.lightGreyDark}
                        />
                      }
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      error={touched.username && errors.username}
                      style={styles.textInputStyle}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.username && errors.username)}
                    >
                      {errors.username}
                    </HelperText>
                  </View>
                </View>
                <View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="Password"
                      mode="outlined"
                      left={
                        <TextInput.Icon
                          icon="lock-outline"
                          color={Colors.lightGreyDark}
                        />
                      }
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      error={touched.password && errors.password}
                      style={styles.textInputStyle}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.password && errors.password)}
                    >
                      {errors.password}
                    </HelperText>
                  </View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="Password Confirmation"
                      mode="outlined"
                      left={
                        <TextInput.Icon
                          icon="lock-alert-outline"
                          color={Colors.lightGreyDark}
                        />
                      }
                      outlineColor={Colors.darkGrey}
                      activeOutlineColor={Colors.brightGreen}
                      keyboardType="default"
                      onChangeText={handleChange("passwordConfirm")}
                      onBlur={handleBlur("passwordConfirm")}
                      value={values.passwordConfirm}
                      error={touched.passwordConfirm && errors.passwordConfirm}
                      style={styles.textInputStyle}
                    />
                    <HelperText
                      type="error"
                      visible={
                        !!(touched.passwordConfirm && errors.passwordConfirm)
                      }
                    >
                      {errors.passwordConfirm}
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
          onPress={handleCreateAccount}
          style={{
            backgroundColor: "#222831",
            padding: 15,
            marginRight: 10,
            marginTop: 20,
            marginLeft: 450,
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
            }}
          >
            Confirm
          </Text>
        </Pressable>
      </View>
      {visibilityUser && (
        <Portal>
          <Dialog
            visible={visibilityUser}
            onDismiss={() => setVisibilityUser(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="alert-circle-outline"
              size={80}
              color={Colors.darkRed}
            />
            <Dialog.Title style={styles.textAlert}>Invalid Inputs</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>{errorMSG}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                textColor={Colors.yellowDark}
                onPress={() => setVisibilityUser(false)}
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

export default AccountCredentialsForm;

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
