import { View, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";

function CheckBox({ id, checkValue, onCheck }) {
  return (
    <Pressable
      onPress={() => {
        onCheck(id, !checkValue);
      }}
      style={{ marginBottom: 10, marginLeft: 2 }}
    >
      <View
        style={[
          styles.checkContainer,
          { backgroundColor: checkValue ? Colors.darkGreen : Colors.white },
        ]}
      >
        <FontAwesome name="check" size={16} color={Colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkContainer: {
    width: 30,
    height: 30,
    borderColor: Colors.darkGreen,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
});

export default CheckBox;
