import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  Pressable,
} from "react-native";
import Colors from "../../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import {
  TextInput,
  HelperText,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { httpGetUserProfile, httpUpdateUserProfile } from "../../api/users.api";
import ErrorDialog from "../UI/ErrorDialog";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useSettingStore } from "../../Store/settingStore";
import ErrorOverlay from "../UI/ErrorOverlay";

//Validation for the users information
const ValidationUser = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "First name can't have digits."),
  lastName: Yup.string()
    .required("Last Name is required.")
    .matches("^[A-Za-z ]{2,50}$", "Last name can't have digits."),
  phoneNumber: Yup.string()
    .required("Phone Number  is required.")
    .matches("^[0-9]{10}$", ""),
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

function ProfilePage({}) {
  const refAccountInformation = useRef(null);
  const refCredentialInformation = useRef(null);

  const toggleReloadSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );
  const reloadSettingList = useSettingStore((state) => state.reloadSettingList);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["UserProfileData", reloadSettingList],
    queryFn: getUserProfile,
    enabled: true,
  });

  async function getUserProfile() {
    const response = await httpGetUserProfile();

    if (response.hasError) {
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
      return;
    }

    return response.data;
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
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [disableInputs, setDisableInputs] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    "The server has a little issue, try refeshing again."
  );

  function isProfileFormValid() {
    // Start to validating there is no error on input page
    const TouchedObject =
      Object.keys(refCredentialInformation.current.touched).length > 0;

    let isValid = true;
    if (
      refCredentialInformation.current.values.password !==
      refCredentialInformation.current.values.passwordConfirm
    ) {
      setErrorMSG("Both passwords must be the same");
      setVisibilityUser(true);
      isValid = false;
    }
    if (
      !refCredentialInformation.current &&
      !refCredentialInformation.current.isValid &&
      !TouchedObject
    ) {
      setErrorMSG("There are missing required or need to correct information.");
      setVisibilityUser(true);
      isValid = false;
    }

    return isValid;
  }

  function isUserProfileValidation() {
    // Start to validating there is no error on input page
    const TouchedObject =
      Object.keys(refAccountInformation.current.touched).length > 0;

    let Valid = true;
    if (
      refAccountInformation.current &&
      refAccountInformation.current.isValid
    ) {
      Valid = true;
    } else {
      Valid = false;
    }

    return Valid;
  }

  async function UserProfileInformationEdit() {
    //Check Validation of the inputs
    const validation = isUserProfileValidation();
    if (validation === false) {
      setErrorMSG("Personal Information incomplete or invalid.");
      setErrorDialogVisible(true);
      return;
    }

    const userPersonalInfo = {
      email: refAccountInformation.current.values.email,
      firstName: refAccountInformation.current.values.firstName,
      lastName: refAccountInformation.current.values.lastName,
      phone: refAccountInformation.current.values.phoneNumber,
      username: refAccountInformation.current.values.username,
    };

    const response = await httpGetUserProfile(userPersonalInfo);

    if (response.hasError) {
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
      return;
    }

    setDisableInputs(!disableInputs);
    showSuccessMessage();
  }

  async function handleProfileSubmission() {
    //Verify that personal user information is not being
    if (disableInputs === false) {
      console.log("ENTERED HERE");
      return;
    }

    const isFormValid = isProfileFormValid();
    if (isFormValid === false) return;

    const userProfileInfo = {
      email: refAccountInformation.current.values.email,
      firstName: refAccountInformation.current.values.firstName,
      lastName: refAccountInformation.current.values.lastName,
      phone: refAccountInformation.current.values.phoneNumber,
      username: refAccountInformation.current.values.username,
      password: refCredentialInformation.current.values.password,
    };

    const response = await httpUpdateUserProfile(userProfileInfo);

    if (response.hasError) {
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
      return;
    }

    showSuccessMessage();
  }

  if (isLoading) {
    return (
      <View style={{ marginTop: 400 }}>
        <LoadingOverlay />
      </View>
    );
  }

  function errorHandler() {
    toggleReloadSettingList();
  }

  if (isError) {
    return (
      <View style={{ marginTop: 200 }}>
        <ErrorOverlay onConfirm={errorHandler} message={errorMessage} />
      </View>
    );
  }

  return (
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
          innerRef={refAccountInformation}
          initialValues={{
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phone,
            email: data.email,
            username: data.username,
          }}
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
                    marginHorizontal: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 10,
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
                        disabled={disableInputs}
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
                        disabled={disableInputs}
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
                    <View style={{ marginVertical: 10, width: 220 }}>
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
                        disabled={disableInputs}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.phoneNumber && errors.phoneNumber)}
                      >
                        {errors.phoneNumber}
                      </HelperText>
                    </View>
                    <View style={{ marginVertical: 10, width: 300 }}>
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
                        disabled={disableInputs}
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
                    <View style={{ marginVertical: 10, width: 260 }}>
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
                        disabled={disableInputs}
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
        {disableInputs === true && (
          <Pressable
            onPress={() => {
              setDisableInputs(!disableInputs);
            }}
          >
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmText}>Edit Information</Text>
            </View>
          </Pressable>
        )}
        {disableInputs === false && (
          <Pressable onPress={UserProfileInformationEdit}>
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmText}>Save Information</Text>
            </View>
          </Pressable>
        )}
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            marginLeft: 20,
            marginBottom: 10,
            marginTop: 30,
          }}
        >
          Change Password
        </Text>
      </View>
      <View>
        <Formik
          validationSchema={ValidationUser}
          innerRef={refCredentialInformation}
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
                    marginHorizontal: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ marginVertical: 10, width: 270 }}>
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
                    <View style={{ marginVertical: 10, width: 270 }}>
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
      </View>

      <Pressable onPress={handleProfileSubmission}>
        <View style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm Changes</Text>
        </View>
      </Pressable>

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
      <ErrorDialog
        dialogVisible={errorDialogVisible}
        setDialogVisible={setErrorDialogVisible}
        errorMSG={errorMSG}
      />
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
  confirmBtn: {
    marginHorizontal: 150,
    backgroundColor: Colors.yellowDark,
    borderRadius: 30,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ProfilePage;
