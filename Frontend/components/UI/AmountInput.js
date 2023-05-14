import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Colors from "../../constants/Colors/Colors";

function AmountInput({ onChange, value, isEditable, inputContainerStyles }) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(value);
  }, [value]);

  function handleTextChange(formattedValue, extractedValue) {
    setAmount(extractedValue);
  }

  function handleEndEditing() {
    let formattedAmount = convertToDecimal(amount);
    onChange(formattedAmount);
  }

  function handleClearAmount() {
    setAmount(0);
    onChange(0);
  }

  function convertToDecimal(num) {
    let str = num.toString();
    return str.slice(0, -2) + "." + str.slice(-2);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
      <View style={[styles.container, inputContainerStyles]}>
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
          onChangeText={handleTextChange}
          onEndEditing={handleEndEditing}
          keyboardType="decimal-pad"
          editable={isEditable}
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
