import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import * as Yup from "yup";

const ValidationCustomer = Yup.object().shape({
  firstName: Yup.string("No digits, only letters are valid.").required(
    "First Name is required."
  ),
  lastName: Yup.string("No digits, only letters are valid.").required(
    "Last Name is required."
  ),
  addressLine1: Yup.string().required("Address Line 1 is required."),
  addressLine2: Yup.string(),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required."),
  phoneNumber: Yup.string().required("Phone Number  is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid Email Address"),
});

function ClientInformation({ navigation }) {
  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Customer Information"></Appbar.Content>
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>Enter new customer information</Text>
      </View>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          addressLine1: "",
          addressLine2: "",
          state: "",
          city: "",
          phoneNumber: "",
          email: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={ValidationCustomer}
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
            style={{ marginBottom: 24 }}
            enabled
          >
            <SafeAreaView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    marginHorizontal: 20,
                    justifyContent: "space-around",
                  }}
                >
                  <View style={styles.containerText}>
                    <View style={{ width: 250 }}>
                      <TextInput
                        label="First Name"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                        value={values.firstName}
                        error={touched.firstName && errors.firstName}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.firstName && errors.firstName)}
                      >
                        {errors.firstName}
                      </HelperText>
                    </View>
                    <View style={{ width: 260 }}>
                      <TextInput
                        label="Last Name"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                        value={values.lastName}
                        error={touched.lastName && errors.lastName}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.lastName && errors.lastName)}
                      >
                        {errors.lastName}
                      </HelperText>
                    </View>
                  </View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="Address Line 1"
                      mode="outlined"
                      left={
                        <TextInput.Icon icon="map" color={Colors.darkGrey} />
                      }
                      outlineColor={Colors.black}
                      activeOutlineColor={Colors.darkGreen}
                      keyboardType="default"
                      onChangeText={handleChange("addressLine1")}
                      onBlur={handleBlur("addressLine1")}
                      value={values.addressLine1}
                      error={!!(touched.addressLine1 && errors.addressLine1)}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.addressLine1 && errors.addressLine1)}
                    >
                      {errors.addressLine1}
                    </HelperText>
                  </View>
                  <View style={{ marginVertical: 30 }}>
                    <TextInput
                      label="Address Line 2 (Optional)"
                      mode="outlined"
                      left={
                        <TextInput.Icon icon="map" color={Colors.darkGrey} />
                      }
                      outlineColor={Colors.black}
                      activeOutlineColor={Colors.darkGreen}
                      keyboardType="default"
                      onChangeText={handleChange("addressLine2")}
                      onBlur={handleBlur("addressLine2")}
                      value={values.addressLine2}
                      error={touched.addressLine2 && errors.addressLine2}
                    />
                    <HelperText
                      type="error"
                      visible={!!(touched.addressLine2 && errors.addressLine2)}
                    >
                      {errors.addressLine2}
                    </HelperText>
                  </View>
                  <View style={styles.containerText}>
                    <View style={{ width: 200 }}>
                      <TextInput
                        label="State"
                        mode="outlined"
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("state")}
                        onBlur={handleBlur("state")}
                        value={values.state}
                        error={touched.state && errors.state}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.state && errors.state)}
                      >
                        {errors.state}
                      </HelperText>
                    </View>
                    <View style={{ width: 260 }}>
                      <TextInput
                        label="City"
                        mode="outlined"
                        left={
                          <TextInput.Icon icon="city" color={Colors.darkGrey} />
                        }
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="default"
                        onChangeText={handleChange("city")}
                        onBlur={handleBlur("city")}
                        value={values.city}
                        error={touched.city && errors.city}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.city && errors.city)}
                      >
                        {errors.city}
                      </HelperText>
                    </View>
                  </View>
                  <View style={styles.containerText}>
                    <View style={{ width: 250 }}>
                      <TextInput
                        label="Phone Number"
                        mode="outlined"
                        left={
                          <TextInput.Icon
                            icon="phone"
                            color={Colors.darkGrey}
                          />
                        }
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="phone-pad"
                        onChangeText={handleChange("phoneNumber")}
                        onBlur={handleBlur("phoneNumber")}
                        value={values.phoneNumber}
                        error={touched.phoneNumber && errors.phoneNumber}
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.phoneNumber && errors.phoneNumber)}
                      >
                        {errors.phoneNumber}
                      </HelperText>
                    </View>
                    <View style={{ width: 270 }}>
                      <TextInput
                        label="E-mail Address"
                        mode="outlined"
                        left={
                          <TextInput.Icon
                            icon="email"
                            color={Colors.darkGrey}
                          />
                        }
                        outlineColor={Colors.black}
                        activeOutlineColor={Colors.darkGreen}
                        keyboardType="email-address"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        error={touched.email && errors.email}
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
            </SafeAreaView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkGreen,
  },
  instruction: {
    fontWeight: "400",
    color: Colors.black,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  containerKey: {
    flex: 1,
  },
});

export default ClientInformation;
