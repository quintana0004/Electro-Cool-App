import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";

const ClientInformation = ({ navigation }) => {
  // Validates the Schema Input Values
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
      <Header divideH={8} divideW={1.1} colorHeader={Colors.lightGreen}>
        <Text style={styles.title}>Client Information</Text>
      </Header>

      <View
        style={{
          top: 180,
          paddingLeft: 45,
          paddingRight: 45,
        }}
      >
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
            <View style={{ justifyContent: "space-between" }}>
              <Text style={styles.container}>
                View the client personal information
              </Text>

              <View style={{ top: 30, justifyContent: "space-between" }}>
                <View style={styles.Frame1}>
                  <View style={{ justifyContent: "space-evenly" }}>
                    <Text style={styles.text}> First Name </Text>
                    <View style={styles.inputfirstname}>
                      <TextInput
                        onChangeText={handleChange("firstName")}
                        value={values.firstName}
                        error={errors.firstName}
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        keyboardType="default"
                      />
                    </View>
                    {errors.firstName && (
                      <Text style={styles.invalid}>{errors.firstName}</Text>
                    )}
                  </View>

                  <View style={{ justifyContent: "space-evenly" }}>
                    <Text style={styles.text}> Last Name </Text>
                    <View style={styles.inputlastname}>
                      <TextInput
                        onChangeText={handleChange("lastName")}
                        value={values.lastName}
                        error={errors.lastName}
                        keyboardType="default"
                      />
                    </View>
                    {errors.lastName && (
                      <Text style={styles.invalid}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>

                <View>
                  <View style={{ marginBottom: 40 }}>
                    <Text style={styles.text}> Address Line 1 </Text>
                    <View style={styles.inputaddresslineone}>
                      <TextInput
                        value={values.address}
                        error={errors.address}
                        autoCapitalize="none"
                        keyboardType="default"
                      />
                    </View>
                    {errors.address && (
                      <Text style={styles.invalid}>{errors.address}</Text>
                    )}
                  </View>

                  <View>
                    <Text style={styles.text}> Address Line 2 (optional) </Text>
                    <View style={styles.inputaddresslinetwo}>
                      <TextInput
                        onChangeText={handleChange("address2")}
                        value={values.address2}
                        error={errors.address2}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.Frame1}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={styles.text}> State </Text>
                    <View style={styles.inputstate}>
                      <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("state")}
                        value={values.state}
                        error={errors.state}
                        placeholder="Enter your State"
                        autoCapitalize="none"
                        keyboardType="default"
                      />
                    </View>
                    <Text style={styles.invalid}>{errors.state}</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "space-evenly",
                      paddingRight: 300,
                    }}
                  >
                    <Text style={styles.text}> City </Text>
                    <View style={styles.inputcity}>
                      <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("city")}
                        value={values.city}
                        error={errors.city}
                        placeholder="Enter your City"
                        autoCapitalize="none"
                        keyboardType="default"
                      />
                    </View>
                    <Text style={styles.invalid}>{errors.city}</Text>
                  </View>
                </View>

                <View style={[styles.Frame1, { justifyContent: "flex-start" }]}>
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      paddingRight: 150,
                    }}
                  >
                    <Text style={styles.text}> Phone Number </Text>
                    <View style={styles.inputphonenumber}>
                      <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("phonenumber")}
                        value={values.phonenumber}
                        error={errors.phonenumber}
                        placeholder="xxx-xxx-xxxx"
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text style={styles.invalid}>{errors.phonenumber}</Text>
                  </View>

                  <View style={{ justifyContent: "space-evenly" }}>
                    <Text style={styles.text}> E-Mail Address</Text>
                    <View style={styles.inputemail}>
                      <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        error={errors.email}
                        placeholder="Enter your E-mail"
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        keyboardType="email-address"
                      />
                    </View>
                    <Text style={styles.invalid}>{errors.email}</Text>
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
  Frame1: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 30,
  },
  Box1: {},

  body: {},
  title: {
    fontSize: 45,
    fontWeight: "700",
    textAlignVertical: "center",
    left: 225,
  },
  invalid: {
    color: "red",
    fontSize: 20,
    fontWeight: "50",
  },
  container: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "50",
  },
  textinput: {
    textAlign: "justify",
    height: 50,
  },
  inputfirstname: {
    height: 50,
    width: 320,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#898A8B",
    paddingVertical: 20,
  },
  inputlastname: {
    height: 50,
    width: 320,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
  inputaddresslineone: {
    height: 50,
    width: 810,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
  inputaddresslinetwo: {
    height: 50,
    width: 810,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
  inputstate: {
    height: 50,
    width: 160,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
  inputcity: {
    height: 50,
    width: 160,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
  inputphonenumber: {
    height: 50,
    width: 200,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
  inputemail: {
    height: 50,
    width: 310,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
  },
});

export default ClientInformation;
