import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/colors";

function CreateCar() {
  const [brand, setBrand] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [containsItems, setContainsItems] = useState(false);
  const [itemDescription, setItemDescription] = useState("");

  //Yes or No Item Buttons
  const [yesSelected, setYesSelected] = useState(false);
  const [noSelected, setNoSelected] = useState(false);

  const onYesPress = () => {
    return (
      setYesSelected(!yesSelected),
      setNoSelected(false),
      setContainsItems(!containsItems)
    );
  };

  const onNoPress = () => {
    return (
      setNoSelected(!noSelected), setYesSelected(false), setContainsItems(false)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Vehicle Information</Text>
      <View style={styles.inputContainer}>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={[styles.vehicleInformation, boxShadow]}
            placeholder="Brand"
            onChangeText={(value) => setBrand(value)}
          />
          <TextInput
            style={[styles.vehicleInformation, boxShadow]}
            placeholder="License Plate"
            onChangeText={(value) => setLicensePlate(value)}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={[styles.vehicleInformation, boxShadow]}
            placeholder="Model"
            onChangeText={(value) => setModel(value)}
          />
          <TextInput
            style={[styles.vehicleInformation, boxShadow]}
            placeholder="Year"
            onChangeText={(value) => setYear(value)}
          />
          <TextInput
            style={[styles.vehicleInformation, boxShadow]}
            placeholder="Mileage"
            onChangeText={(value) => setMileage(value)}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={[styles.vehicleInformation, boxShadow]}
            placeholder="Color"
            onChangeText={(value) => setColor(value)}
          />
          <TextInput
            style={[styles.vin, boxShadow]}
            placeholder="VIN"
            onChangeText={(value) => setVin(value)}
          />
        </View>
        <Text style={styles.questionText}>
          Does the vehicle contain any object of value?
        </Text>
        <View style={styles.horizontalContainer}>
          {yesSelected === true ? (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.radioButtonUnselected}
              onPress={onYesPress}
            >
              <View style={styles.selectedRadioButton} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.radioButtonUnselected}
              onPress={onYesPress}
            />
          )}
          <Text style={styles.radioText}> Yes </Text>
          {noSelected === true ? (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.radioButtonUnselected}
              onPress={onNoPress}
            >
              <View style={styles.selectedRadioButton} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.radioButtonUnselected}
              onPress={onNoPress}
            />
          )}
          <Text style={styles.radioText}> No </Text>
        </View>
        <Text style={styles.questionText}>
          If yes, what object of value was left in the car?
        </Text>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={[styles.itemDescriptionBox, boxShadow]}
            placeholderTextColor="transparent"
            multiline
            numberOfLines={3}
            scrollEnabled={false}
            onChange={(value) => setItemDescription(value)}
          ></TextInput>
        </View>
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
    marginVertical: 5,
  },

  vehicleInformation: {
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

  vin: {
    backgroundColor: Colors.white,
    fontSize: 20,
    textAlign: "center",
    height: "70%",
    width: "40%",
    margin: 20,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  questionText: {
    fontSize: 25,
    marginVertical: 10,
  },

  radioButtonUnselected: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.blackGrey,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  selectedRadioButton: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: Colors.blackGrey,
  },

  radioText: {
    fontSize: 25,
    marginLeft: 15,
    marginRight: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  itemDescriptionBox: {
    backgroundColor: Colors.white,
    fontSize: 20,
    height: 100,
    width: "50%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    textAlignVertical: "top",
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

export default CreateCar;
