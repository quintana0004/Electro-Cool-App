import { useState } from "react";
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Colors from "../../constants/Colors/Colors";

function AmountInput({ onChange }) {
  const [amount, setAmount] = useState(0);

  function handleTextChange(formattedValue, extractedValue) {
    setAmount(extractedValue);
    onChange(formattedValue);
  }

  function handleClearAmount() {
    setAmount(0);
    onChange("");
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
      <View style={styles.container}>
        <MaskedTextInput
          type="currency"
          style={styles.textInput}
          value={amount}
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          onChangeText={(formatted, extracted) => handleTextChange(formatted, extracted)}
          keyboardType="decimal-pad"
        />

        <View style={styles.button}>
          <Pressable onPress={handleClearAmount}>
            <View>
              <Text style={styles.buttonText}>Clear</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AmountInput;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(235, 194, 86, 0.5)",
    borderColor: "rgba(0,0,0,0.15)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
  },
  textInput: {
    height: 45,
    width: "60%",
    fontSize: 16,
    backgroundColor: Colors.white,
    borderColor: "trasparent",
    borderRadius: 20,
    padding: 10,
  },
  button: {
    width: "35%",
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});
