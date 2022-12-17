import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function TextInputComponent({
  label,
  messageinvalid,
  invalid,
  inputstyles,
  textInputConfig,
}) {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}> {label} </Text>

      <TextInput
        {...textInputConfig}
        style={[styles.input, styles.placeholderStyle]}
      />
      {invalid && <Text style={styles.textErrorStyle}> {messageinvalid}</Text>}
    </View>
  );
}

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 60,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#898A8B",
    autoCapitalize: "none",
  },
  inputStyle: { fontSize: 20 },
  labelStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
  placeholderStyle: { fontSize: 20 },
  textErrorStyle: { fontSize: 16, color: "red", fontWeight: "bold" },
});
