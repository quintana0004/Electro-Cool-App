import { Text, View, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function CustomerItemCB() {
  return (
    <View>
      <Pressable>
        <View>
          <Text> customer info </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CustomerItemCB;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1.8,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});
