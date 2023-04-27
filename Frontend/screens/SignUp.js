import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Figures from "../constants/figures/Figures";
import Colors from "../constants/Colors/Colors";
import { Formik } from "formik";
import {
  Avatar,
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useCustomerInfoStore } from "../Store/JobOrderStore";
import { useAccountUser } from "../Store/AccountStore";
import { httpSignup } from "../api/auth.api";
import { getTokens, storeTokens } from "../Store/secureStore";

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

function SignUp({ navigation }) {
  //Store Hooks
  const customerInfo = useCustomerInfoStore((state) => ({
    email: state.email,
    firstName: state.firstName,
    lastName: state.lastName,
    phone: state.phone,
  }));
  const setCustomerInfo = useCustomerInfoStore(
    (state) => state.setCustomerInfo
  );

  // TODO: Must change this to only store the tokens, not the credentials
  const setAccountUser = useAccountUser((state) => state.setAccountUser);

  //Get Information Reference of the user info
  const refInformation = useRef(null);
  const refAccount = useRef(null);

  //Visibility of the pages
  const [page, setPage] = useState(0);

  //Visibility of validation modal
  const [visibilityInfo, setVisibilityInfo] = useState(false);
  const [visibilityUser, setVisibilityUser] = useState(false);

  //Visibility of confirm user account created
  const [visibilityAccountConfirm, setVisibilityAccountConfirm] =
    useState(false);

  //Error Message of the user
  const [errorMSG, setErrorMSG] = useState("");

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

  function handleAccountDialogConfirmation() {
    setVisibilityAccountConfirm(false);
    navigation.navigate("Dashboard");
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("LogIn")}
        style={{
          backgroundColor: "#CACACA",
          padding: 10,
          marginRight: 540,
          marginTop: 20,
          marginLeft: 10,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500" }}>
          Create an Account
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "200" }}>
          Let's get started creating an account!
        </Text>
      </View>
      {page === 0 && (
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
                        />
                        <HelperText
                          type="error"
                          visible={
                            !!(touched.phoneNumber && errors.phoneNumber)
                          }
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
                <Dialog.Title style={styles.textAlert}>
                  Invalid Inputs
                </Dialog.Title>
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
      )}
      {page === 1 && (
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
                          error={
                            touched.passwordConfirm && errors.passwordConfirm
                          }
                          style={styles.textInputStyle}
                        />
                        <HelperText
                          type="error"
                          visible={
                            !!(
                              touched.passwordConfirm && errors.passwordConfirm
                            )
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
                <Dialog.Title style={styles.textAlert}>
                  Invalid Inputs
                </Dialog.Title>
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
      )}
      {visibilityAccountConfirm && (
        <Portal>
          <Dialog
            visible={visibilityAccountConfirm}
            onDismiss={() => setVisibilityAccountConfirm(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="check-decagram"
              size={80}
              color={Colors.darkGreen}
            />
            <Dialog.Title style={styles.textAlert}>Create Account</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                Once the account has been created must wait for the
                administrator to confirm user account.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                textColor={Colors.darkGreen}
                onPress={handleAccountDialogConfirmation}
              >
                Confirm
              </Button>
              <Button
                textColor={Colors.yellowDark}
                onPress={() => setVisibilityAccountConfirm(false)}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  instruction: {
    fontWeight: "400",
    color: Colors.black,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
});
export default SignUp;
