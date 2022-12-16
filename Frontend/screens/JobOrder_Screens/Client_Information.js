import React from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native"; // Keyboard please don't forget :)
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";
import TextInputComponent from "../../components/UI/TextInput";

const ClientInformation = ({ navigation }) => {
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try Again!"),
    lastName: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try Again!"),
    address: yup.string().required("Field is Required"),
    address2: yup.string().required("Field is Required"),
    state: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try Again!"),
    city: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try again!"),
    phonenumber: yup.string().required("Field is Required"),
    email: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try Again!"),
  });

  return (
    <View>
      <View>
        <Header divideH={8} divideW={1.1} colorHeader={Colors.lightGreen}>
          <Text style={styles.title}>Client Information</Text>
        </Header>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
            address2: "",
            state: "",
            city: "",
            phonenumber: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View
              style={{
                top: 180,
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <Text style={styles.container}>
                View the client personal information
              </Text>
              <View>
                <View style={{ paddingBottom: 30 }}>
                  <View style={styles.inputfirstname}>
                    <TextInputComponent
                      label="First Name"
                      textInputConfig={{
                        onChangeText: handleChange("firstName"),
                        value: values.firstName,
                      }}
                      invalid={errors.firstName}
                      messageinvalid={errors.firstName}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: "700",
    textAlignVertical: "center",
    left: 225,
  },
  Frame1: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
    paddingLeft: 20,
  },
  inputfirstname: {
    width: 350,
  },
  inputlastname: {
    width: 350,
  },
  inputaddress: {
    width: "100%",
  },
  inputstate: {
    width: 230,
  },
  inputcity: {
    width: 250,
  },
  inputnumber: {
    width: 300,
  },
  inputemail: {
    width: 350,
  },
  invalid: {
    color: "red",
    fontSize: 20,
    fontWeight: "50",
  },
});

export default ClientInformation;
