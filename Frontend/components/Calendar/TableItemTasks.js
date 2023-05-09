import { Text, View, StyleSheet, Pressable } from "react-native";
import { format } from "date-fns";
import { httpDeleteTask } from "../../api/tasks.api";
import Colors from "../../constants/Colors/Colors";
import { Entypo } from "@expo/vector-icons";

function TableItemTasks({ itemData, onDelete }) {
  const { id, title, date } = itemData;

  function DateText() {
    return format(new Date(date), "MM/dd/yyyy");
  }

  async function handleDelete() {
    await httpDeleteTask(id);
    onDelete();
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={{ width: 300, marginLeft: 15 }}>
          <Text>{title}</Text>
        </View>
        <View style={{ width: 100, marginRight: 60 }}>
          <Text>{DateText()}</Text>
        </View>
        <Pressable
          onPress={handleDelete}
          style={{
            borderRadius: 50,
            marginRight: 20,
          }}
        >
          <View style={{ top: 1 }}>
            <Entypo name="trash" size={24} color="black" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default TableItemTasks;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
