import React from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native"; // Keyboard please don't forget :)
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";
import TextInputComponent from "../../components/UI/TextInput";
import NavBtn from "../../components/UI/NavBtns";

function ClientInformation({ navigation }) {
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
    address2: yup.string(),
    state: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try Again!"),
    city: yup
      .string()
      .required("Field is Required")
      .matches("^[A-Za-z.-]+(s*[A-Za-z.-]+)*$", "Invalid. Try again!"),
    phonenumber: yup.string().matches(""),
    email: yup
      .string()
      .required("Field is Required")
      .matches(
        "^[A-Za-z0-9_!#$%&'* +/=?`{|}~^.-]+@[A-Za-z0-9.-]+$",
        "Invalid. Try Again!"
      ),
  });
  function navCustomerSelection() {
    navigation.navigate("CustomerSelection");
  }
  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }
  function navCarSelection() {
    navigation.navigate("CarSelection");
  }
  return (
    <View>
      <View>
        <Header divideH={8} divideW={1} colorHeader={Colors.lightGreen}>
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
                top: 90,
                paddingLeft: 30,
                paddingRight: 20,
              }}
            >
              <Text style={styles.container}>
                View the client personal information
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  paddingTop: 20,
                }}
              >
                <View style={{ paddingBottom: 10 }}>
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
                <View>
                  <View style={styles.inputlastname}>
                    <TextInputComponent
                      label="Last Name"
                      textInputConfig={{
                        onChangeText: handleChange("lastName"),
                        value: values.lastName,
                      }}
                      invalid={errors.lastName}
                      messageinvalid={errors.lastName}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <View style={styles.inputaddress}>
                  <TextInputComponent
                    label="Address Line"
                    textInputConfig={{
                      onChangeText: handleChange("address"),
                      value: values.address,
                    }}
                    invalid={errors.address}
                    messageinvalid={errors.address}
                  />
                </View>
                <View style={styles.inputaddresstwo}>
                  <TextInputComponent
                    label="Address Line 2 (optional)"
                    textInputConfig={{
                      onChangeText: handleChange("address2"),
                      value: values.address2,
                    }}
                    invalid={errors.address2}
                    messageinvalid={errors.address2}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View>
                  <View style={styles.inputstate}>
                    <TextInputComponent
                      label="State"
                      textInputConfig={{
                        onChangeText: handleChange("state"),
                        value: values.state,
                        placeholder: "Enter State",
                        placeholderTextColor: "gray",
                      }}
                      invalid={errors.state}
                      messageinvalid={errors.state}
                    />
                  </View>

                  <View style={styles.inputnumber}>
                    <TextInputComponent
                      label="Phone Number"
                      textInputConfig={{
                        onChangeText: handleChange("number"),
                        placeholder: "Enter Number",
                        placeholderTextColor: "gray",
                        keyboardType: "numeric",
                      }}
                      invalid={errors.phonenumber}
                      messageinvalid={errors.phonenumber}
                    />
                  </View>
                </View>

                <View style={{ paddingLeft: 50 }}>
                  <View style={styles.inputcity}>
                    <TextInputComponent
                      label="City"
                      textInputConfig={{
                        onChangeText: handleChange("city"),
                        placeholder: "Enter City",
                        placeholderTextColor: "gray",
                      }}
                      invalid={errors.city}
                      messageinvalid={errors.city}
                    />
                  </View>

                  <View style={styles.email}>
                    <TextInputComponent
                      label="E-mail"
                      textInputConfig={{
                        placeholder: "Enter E-mail",
                        placeholderTextColor: "gray",
                        onChangeText: handleChange("email"),
                      }}
                      invalid={errors.email}
                      messageinvalid={errors.email}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.naviBtnsPosition}>
                <View style={styles.navBackBtn}>
                  <NavBtn choice={"Back"} nav={navCustomerSelection} />
                </View>
                <View style={styles.navCancelBtn}>
                  <NavBtn choice={"Cancel"} nav={navJobOrder} />
                </View>
                <View style={styles.navNextBtn}>
                  <NavBtn choice={"Next"} nav={navCarSelection} />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: "700",
    textAlignVertical: "center",
    left: 120,
  },
  Frame1: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 40,
    paddingBottom: 1,
  },
  inputfirstname: {
    width: 250,
  },
  inputlastname: {
    width: 250,
  },
  inputaddress: {
    width: "100%",
    paddingBottom: 20,
  },
  inputaddresstwo: {
    width: "100%",
    paddingBottom: 20,
  },
  inputstate: {
    width: 230,
    paddingBottom: 25,
  },
  inputcity: {
    width: 250,
    paddingBottom: 25,
  },
  inputnumber: {
    width: 250,
  },
  inputemail: {
    width: 350,
  },
  invalid: {
    color: "red",
    fontSize: 20,
    fontWeight: "50",
  },
  naviBtnsPosition: {
    width: 540,
    height: 176,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navBackBtn: {
    marginRight: 130,
  },
  navCancelBtn: {
    marginRight: 10,
  },
  navNextBtn: {
    marginLeft: 10,
  },
});

export default ClientInformation;
