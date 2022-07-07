import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Platform } from "react-native";
import { Colors } from "../../../constants/colors";
import Button from "../../UI/Button";

function CreateClient() {
  const [firstName, setFirstName] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Client Information</Text>
      <View style={styles.inputContainer}>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={[styles.nameInput, boxShadow]}
            placeholder="First Name"
            onChangeText={(value) => setFirstName(value)}
          />
          <TextInput
            style={[styles.nameInput, boxShadow]}
            placeholder="First Last Name"
            onChangeText={(value) => setFirstLastName(value)}
          />
          <TextInput
            style={[styles.nameInput, boxShadow]}
            placeholder="Second Last Name"
            onChangeText={(value) => setSecondLastName(value)}
          />
        </View>

        <TextInput
          style={[styles.addressInput, boxShadow]}
          placeholder="Address Line 1"
          onChangeText={(value) => setAddressLine1(value)}
        />
        <TextInput
          style={[styles.addressInput, , boxShadow]}
          placeholder="Address Line 2"
          onChangeText={(value) => setAddressLine2(value)}
        />

        <View style={styles.horizontalContainer}>
          <TextInput
            style={[styles.stateCityInput, boxShadow]}
            placeholder="State"
            onChangeText={(value) => setState(value)}
          />
          <TextInput
            style={[styles.stateCityInput, boxShadow]}
            placeholder="City"
            onChangeText={(value) => setCity(value)}
          />
        </View>
        <TextInput
          style={[styles.phoneNumberInput, boxShadow]}
          placeholder="+1 787 123 456"
          onChangeText={(value) => setPhoneNumber(value)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.emailInput, boxShadow]}
          placeholder="E-mail address"
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 0,
    marginLeft: 20,
  },

  baseText: {
    fontSize: 25,
  },

  inputContainer: {
    flex: 1,
  },

  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
  },

  nameInput: {
    backgroundColor: Colors.white,
    fontSize: 20,
    textAlign: "center",
    height: "70%",
    width: "25%",
    margin: 20,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  addressInput: {
    backgroundColor: Colors.white,
    fontSize: 20,
    textAlign: "center",
    height: 60,
    margin: 20,
    marginBottom: 15,
    marginRight: 100,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  stateCityInput: {
    backgroundColor: Colors.white,
    fontSize: 20,
    textAlign: "center",
    height: "70%",
    width: "25%",
    margin: 20,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  phoneNumberInput: {
    backgroundColor: Colors.white,
    fontSize: 20,
    textAlign: "center",
    height: 60,
    width: "25%",
    margin: 10,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  emailInput: {
    backgroundColor: Colors.white,
    fontSize: 20,
    textAlign: "center",
    height: 60,
    width: "40%",
    margin: 10,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});

const boxShadow = StyleSheet.create({
  ...Platform.select({
    ios: {
      shadowColor: Colors.blackGrey,
      shadowRadius: 2,
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 1,
        width: 0,
      },
    },
    android: {
      shadowColor: "black",
      elevation: 5,
    },
  }),
});

export default CreateClient;
