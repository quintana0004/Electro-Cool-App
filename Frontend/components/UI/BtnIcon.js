import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function BtnIcon({ handler, name, size, color, children }) {
  return (
    <TouchableOpacity onPress={handler} activeOpacity={0.3}>
      <View style={styles.box}>
        <View style={styles.container}>
          <Ionicons name={name} size={size} color={color} />
          <Text style={styles.text}>{children}</Text>
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

export default BtnIcon;
