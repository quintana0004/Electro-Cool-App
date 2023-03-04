import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";

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
      <Formik>
        <View>
          <View>
            <TextInput label="First Name" mode="outlined" />
            <TextInput label="Last Name" mode="outlined" />
          </View>
          <View>
            <TextInput label="Address Line 1" mode="outlined" />
          </View>
          <View>
            <TextInput label="Address Line 2 (Optional)" mode="outlined" />
          </View>
          <View>
            <TextInput label="State" mode="outlined" />
            <TextInput label="City" mode="outlined" />
          </View>
          <View>
            <TextInput label="Phone Number" mode="outlined" />
            <TextInput label="E-mail Address" mode="outlined" />
          </View>
        </View>
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
});

export default ClientInformation;
