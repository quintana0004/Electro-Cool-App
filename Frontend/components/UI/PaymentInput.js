import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { MaskedText } from "react-native-mask-text";
import Colors from "../../constants/Colors/Colors";

function PaymentInput({ value }) {

  const formattedAmount = value * 100;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
      <View style={styles.container}>
        <MaskedText
          type="currency"
          style={styles.textInput}
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          keyboardType="decimal-pad"
        >
          {formattedAmount}
        </MaskedText>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PaymentInput;

const styles = StyleSheet.create({
  container: {
    width: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(235, 194, 86, 0.5)",
    borderColor: "rgba(0,0,0,0.15)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
  },
  textInput: {
    height: 50,
    width: 180,
    fontSize: 20,
    backgroundColor: Colors.white,
    borderColor: "trasparent",
    borderRadius: 20,
    padding: 10,
    textAlign: "center"
  },
});
