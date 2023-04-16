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
  Pressable,
} from "react-native";
import Figures from "../constants/figures/Figures";
import Colors from "../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";
import StepIndicator from "react-native-step-indicator";

const validatorUser = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required."),
});

function SignUp({ navigation }) {
  const ref = useRef(null);
  const labels = ["Information", "Account"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#222831",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#222831",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#222831",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#222831",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#222831",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#222831",
  };

  function getStepIndicatorIcon(position, stepStatus) {
    const iconConfig = {
      name: "",
    };
  }

  return (
    <View style={style.container}>
      <Pressable
        onPress={() => navigation.navigate("LogIn")}
        style={{
          backgroundColor: "#222831",
          padding: 15,
          marginRight: 470,
          marginTop: 20,
          marginLeft: 10,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={Figures.Arrow} style={{ width: 10, height: 20 }} />
        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 20,
          }}
        >
          Back
        </Text>
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          source={Figures.SignUpLogo}
          style={{ width: 217, height: 210 }}
        />
      </View>
      <View>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={0}
          labels={labels}
          stepCount={2}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SignUp;
