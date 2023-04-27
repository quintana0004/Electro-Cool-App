import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
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
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import { httpLogin } from "../api/auth.api";
import { storeTokens } from "../Store/secureStore";

const validatorUser = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      "^[A-Za-z0-9@.]{2,50}$",
      "Username must contain letters and digits."
    ),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      "^[A-Za-z0-9@._]{5,50}$",
      "Password must contain letters, digits and special character. Need a eight charaters or more."
    ),
});

function LogIn({ navigation }) {
  //Store Hooks
  //Reference of the user info entered
  const ref = useRef(null);

  //Visibility of confirm user account created
  const [visibilityAccountConfirm, setVisibilityAccountConfirm] =
    useState(false);

  //Visibility of the modal error
  const [visibilityUser, setVisibilityUser] = useState(false);

  //Error Message of the user
  const [errorMSG, setErrorMSG] = useState("");

  function handleInputValidation() {
    // Check Validation of the user login
    const TouchedObject = Object.keys(ref.current.touched).length > 0;

    if (!ref.current && !ref.current.isValid && !TouchedObject) {
      setErrorMSG("There are missing required or need to correct information.");
      setVisibilityUser(true);
      return false;
    }

    return true;
  }

  async function handleLogin() {
    const isValid = handleInputValidation();
    if (isValid === false) return;

    const response = await httpLogin(
      ref.current.values.username,
      ref.current.values.password
    );
    if (response.hasError) {
      return Alert.alert("Error", response.errorMessage);
    }

    await storeTokens(response.data.accessToken, response.data.refreshToken);
    navigation.navigate("Dashboard");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Figures.BackGroundLogIn} style={styles.image}>
        <View style={styles.header}>
          <Image
            source={Figures.logoCompany}
            style={{ width: 70, height: 70 }}
          />
          <Text style={styles.textHeader}>ELECTRO COOL</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validatorUser}
              innerRef={ref}
            >
              {({ handleChange, handleBlur, values, errors, touched }) => (
                <KeyboardAvoidingView
                  behavior="padding"
                  enabled
                  keyboardVerticalOffset={-100}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerText}>
                      <View style={{ width: 400, marginTop: 50 }}>
                        <TextInput
                          mode="outlined"
                          label="Username"
                          outlineColor={Colors.darkGrey}
                          activeOutlineColor="#222831"
                          keyboardType="default"
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          value={values.username}
                          error={touched.username && errors.username}
                          style={styles.textInputStyle}
                          right={
                            <TextInput.Icon
                              icon="account-circle"
                              color={Colors.lightGreyDark}
                            />
                          }
                        />
                        <HelperText
                          type="error"
                          visible={!!(touched.username && errors.username)}
                        >
                          {errors.username}
                        </HelperText>
                      </View>
                      <View style={{ width: 400, marginTop: 50 }}>
                        <TextInput
                          mode="outlined"
                          label="Password"
                          secureTextEntry={true}
                          outlineColor={Colors.darkGrey}
                          activeOutlineColor="#222831"
                          keyboardType="default"
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          error={touched.password && errors.password}
                          style={styles.textInputStyle}
                          right={
                            <TextInput.Icon
                              icon="lock-outline"
                              color={Colors.lightGreyDark}
                            />
                          }
                        />
                        <HelperText
                          type="error"
                          visible={!!(touched.password && errors.password)}
                        >
                          {errors.password}
                        </HelperText>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              )}
            </Formik>
          </View>
        </View>
        <View style={styles.direction}>
          <View style={styles.recovery}>
            <Text style={styles.textRecovery}>Recovery Password</Text>
          </View>
          <Pressable style={styles.btnPlacement} onPress={handleLogin}>
            <Text
              style={{ color: Colors.white, fontSize: 20, fontWeight: "bold" }}
            >
              LOG IN
            </Text>
          </Pressable>
          <View style={styles.message}>
            <Text
              style={{ color: Colors.black, fontSize: 20, fontWeight: "bold" }}
            >
              Don't have an account?
            </Text>
            <Text
              style={{
                color: "#222831",
                fontSize: 20,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Sign Up
            </Text>
          </View>
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
              <Dialog.Title style={styles.textAlert}>
                Waiting for Admin
              </Dialog.Title>
              <Dialog.Content>
                <Text style={styles.textAlert}>
                  The administrator hasn/'t confirmed your account yet, please
                  wait to be verified and then log in to account.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    backgroundColor: Colors.yellowDark,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
    width: 510,
    position: "absolute",
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    top: 40,
  },
  content: {
    marginTop: 200,
  },
  direction: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textHeader: {
    color: Colors.white,
    fontSize: 50,
    fontWeight: "bold",
    marginLeft: 10,
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 100,
    marginHorizontal: 100,
  },
  recovery: {
    flexDirection: "row-reverse",
  },
  textRecovery: {
    fontWeight: "500",
    color: Colors.darkBlack,
    fontSize: 20,
    marginRight: 100,
  },
  btnPlacement: {
    marginHorizontal: 100,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
    color: Colors.white,
    padding: 10,
    borderRadius: 50,
  },
  message: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  textAlert: {
    textAlign: "center",
  },
});

export default LogIn;
