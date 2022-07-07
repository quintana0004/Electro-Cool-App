import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import { Colors } from "../../../constants/colors";

function CheckBox() {
  const [checked, setCheck] = useState(false);

  function onCheckmarkPress() {
    setCheck(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked]}
      onPress={onCheckmarkPress}
    >
      {checked && <Text style={styles.checkBoxIcon}>&#10003;</Text>}
    </Pressable>
  );
}

function RequestedService() {
  const [typeService, setTypeService] = useState("");
  const [oilChange, setOilChange] = useState(false);
  const [motor, setMotor] = useState(false);
  const [scan, setScan] = useState(false);
  const [tuneUp, setTuneUp] = useState(false);
  const [coolingSystem, setCoolingSystem] = useState(false);
  const [airConditioning, setAirConditioning] = useState(false);
  const [breaks, setBreaks] = useState(false);
  const [suspension, setSuspension] = useState(false);
  const [electricSystem, setElectricSystem] = useState(false);
  const [specifications, setSpecifications] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <Text style={styles.baseText}>Requested Service</Text>
        <Text style={[styles.baseText, { marginLeft: 350 }]}>
          Type of Service
        </Text>
        <TextInput
          style={styles.typeInput}
          placeholder="Heavy/Light"
          onChange={(value) => setTypeService(value)}
        />
      </View>

      <View style={styles.horizontalContainer}>
        <View style={styles.serviceContainer}>
          <CheckBox
            style={boxShadow}
            onPress={() => setOilChange(!oilChange)}
          />
          <Text style={styles.checkBoxDescription}>Oil Change</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox style={boxShadow} onPress={() => setMotor(!motor)} />
          <Text style={styles.checkBoxDescription}>Motor</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox style={boxShadow} onPress={() => setScan(!scan)} />
          <Text style={styles.checkBoxDescription}>Scan</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox style={boxShadow} onPress={() => setTuneUp(!tuneUp)} />
          <Text style={styles.checkBoxDescription}>Tune Up</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox
            style={boxShadow}
            onPress={() => setCoolingSystem(!coolingSystem)}
          />
          <Text style={styles.checkBoxDescription}>Cooling System</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox
            style={boxShadow}
            onPress={() => setAirConditioning(!airConditioning)}
          />
          <Text style={styles.checkBoxDescription}>Air Conditioning</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox style={boxShadow} onPress={() => setBreaks(!breaks)} />
          <Text style={styles.checkBoxDescription}>Breaks</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox
            style={boxShadow}
            onPress={() => setSuspension(!suspension)}
          />
          <Text style={styles.checkBoxDescription}>Suspension</Text>
        </View>
        <View style={styles.serviceContainer}>
          <CheckBox
            style={boxShadow}
            onPress={() => setElectricSystem(!electricSystem)}
          />
          <Text style={styles.checkBoxDescription}>Electric System</Text>
        </View>
      </View>
      <Text style={styles.baseText}>Specifications & Observations</Text>
      <View style={styles.specificationsContainer}>
        <TextInput
          style={[styles.specifications, boxShadow]}
          placeholderTextColor="transparent"
          multiline
          scrollEnabled={false}
          numberOfLines={6}
          maxLength={255}
          onChange={(value) => setSpecifications(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
  },
  baseText: {
    fontSize: 25,
  },

  typeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 15,
  },

  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
  },

  serviceContainer: {
    display: "flex",
    flexDirection: "row",
    flexBasis: "33%",
    marginVertical: 5,
  },

  typeInput: {
    backgroundColor: Colors.white,
    fontSize: 25,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.blackGrey,
    width: 200,
    height: 50,
    marginRight: 50,
    borderRadius: 10,
  },

  checkboxBase: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.blackGrey,
    backgroundColor: Colors.white,
    marginTop: 10,
    marginRight: 10,
  },

  checkBoxIcon: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },

  checkBoxDescription: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
    marginRight: 50,
  },

  specificationsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
  },

  specifications: {
    backgroundColor: Colors.white,
    fontSize: 20,
    height: 220,
    width: "99%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 50,
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
        height: 0,
        width: 0,
      },
    },
    android: {
      shadowColor: "black",
      elevation: 5,
    },
  }),
});

export default RequestedService;
