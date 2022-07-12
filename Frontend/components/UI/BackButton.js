import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function BackButton({ handler }) {
  return (
    <TouchableOpacity onPress={handler} activeOpacity={0.3}>
      <View style={styles.box}>
        <View style={styles.container}>
          <Ionicons name="ios-arrow-back-circle" size={45} color="black" />
          <Text style={styles.text}>Back</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 190,
    height: 80,
    backgroundColor: Colors.yellow,
    paddingHorizontal: 30,
    marginTop: 30,
    borderRadius: 30,
    borderColor: Colors.grey,
    borderWidth: 1,
    paddingVertical: 15,
    alignContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 3,
  },
});

export default BackButton;
