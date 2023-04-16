import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Figures from "../constants/figures/Figures";
import Colors from "../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";

const validatorUser = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required."),
});

function LogIn({ navigation }) {
  const ref = useRef(null);

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
          <View
            style={styles.btnPlacement}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text
              style={{ color: Colors.white, fontSize: 20, fontWeight: "bold" }}
            >
              LOG IN
            </Text>
          </View>
          <View style={styles.message}>
            <Text
              style={{ color: Colors.black, fontSize: 20, fontWeight: "bold" }}
            >
              {" "}
              Don't have an account?{" "}
            </Text>
            <Text
              style={{ color: "#222831", fontSize: 20, fontWeight: "bold" }}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Sign Up
            </Text>
          </View>
        </View>
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
});
export default LogIn;
