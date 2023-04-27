import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import { Appbar } from "react-native-paper";
import ToggleBtnSetting from "../components/Setting/ToggleBtnSetting";
import { ErrorMessage, Formik } from "formik";
import {
  TextInput,
  HelperText,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import * as Yup from "yup";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const ValidationUser = Yup.object().shape({
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
  role: Yup.string(),
});

function Setting({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Profile");

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  const refInformation = useRef(null);
  const refAccount = useRef(null);

  function DataRespondFormik() {
    let dataPassed;

    if (true) {
      dataPassed = {
        firstName: "Jessica",
        lastName: "Quintana Rivera",
        phoneNumber: "7877027103",
        email: "jessynquintana@gmail.com",
        username: "Jessy004",
      };
    } else {
      dataPassed = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      };
    }

    return dataPassed;
  }

  //Toast Message
  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
  }

  function showFailedMessage() {
    ToastAndroid.show("Try Again, there was a problem!", ToastAndroid.SHORT);
  }

  //Visibility of the modal error
  const [visibilityUser, setVisibilityUser] = useState(false);

  //Error Message of the user
  const [errorMSG, setErrorMSG] = useState("");

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />

        <ToggleBtnSetting
          toggleActiveCategory={updateActiveCategory}
          activeCategory={activeCategory}
        />
      </Appbar.Header>
      <View style={styles.body}>
        {activeCategory === "Profile" && (
          <View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  marginLeft: 20,
                  marginBottom: 10,
                  marginTop: 20,
                }}
              >
                Personal Information
              </Text>
              <Formik
                validationSchema={ValidationUser}
                innerRef={refInformation}
                initialValues={DataRespondFormik()}
                enableReinitialize={true}
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
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 20,
                          }}
                        >
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
                              disabled={true}
                            />
                            <HelperText
                              type="error"
                              visible={
                                !!(touched.firstName && errors.firstName)
                              }
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
                              disabled={true}
                            />
                            <HelperText
                              type="error"
                              visible={!!(touched.lastName && errors.lastName)}
                            >
                              {errors.lastName}
                            </HelperText>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ marginVertical: 30, width: 220 }}>
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
                              disabled={true}
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
                          <View style={{ marginVertical: 30, width: 300 }}>
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
                              disabled={true}
                            />
                            <HelperText
                              type="error"
                              visible={!!(touched.email && errors.email)}
                            >
                              {errors.email}
                            </HelperText>
                          </View>
                        </View>
                        <View>
                          <View style={{ marginVertical: 20, width: 260 }}>
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
                              disabled={true}
                            />
                            <HelperText
                              type="error"
                              visible={!!(touched.username && errors.username)}
                            >
                              {errors.username}
                            </HelperText>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                )}
              </Formik>
            </View>
            <View></View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  marginLeft: 20,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Change Password
              </Text>
            </View>
            <View>
              <Formik
                validationSchema={ValidationUser}
                innerRef={refAccount}
                initialValues={{
                  username: "",
                  password: "",
                  passwordConfirm: "",
                }}
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
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ marginVertical: 30, width: 270 }}>
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
                          <View style={{ marginVertical: 30, width: 270 }}>
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
                                touched.passwordConfirm &&
                                errors.passwordConfirm
                              }
                              style={styles.textInputStyle}
                            />
                            <HelperText
                              type="error"
                              visible={
                                !!(
                                  touched.passwordConfirm &&
                                  errors.passwordConfirm
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
            </View>

            <View style={{ marginHorizontal: 100 }}>
              <Button
                textColor={Colors.white}
                onPress={() => {
                  // Start to validating there is no error on input page
                  const TouchedObject =
                    Object.keys(refAccount.current.touched).length > 0;

                  if (
                    refAccount.current.values.password !==
                    refAccount.current.values.passwordConfirm
                  ) {
                    setErrorMSG("Both passwords must be the same");
                    setVisibilityUser(true);
                  }
                  if (
                    !refAccount.current &&
                    !refAccount.current.isValid &&
                    !TouchedObject
                  ) {
                    setErrorMSG(
                      "There are missing required or need to correct information."
                    );
                    setVisibilityUser(true);
                  }

                  showSuccessMessage();
                }}
                mode="contained"
                buttonColor={Colors.yellowDark}
              >
                Confirm Password
              </Button>
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
        {activeCategory === "RBAC" && (
          <View>
            <Text>HERE PLACE THE LIST</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
  textAlert: {
    textAlign: "center",
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
});

export default Setting;
