import { View, Text, Pressable, StyleSheet } from "react-native";
import { format } from "date-fns";
import CheckBox from "../UI/Checkbox";

function ExistingClientItemTableItem({ itemData, onSelected }) {
  const { id, firstName, lastName, date } = itemData;
  const formattedDate = format(new Date(date), "MM/dd/yyyy");
  const fullName = `${lastName}, ${firstName}`;

  return (
    <View>
      <Pressable>
        <View style={styles.container}>
          <View style={{ width: 250, marginLeft: 20 }}>
            <Text style={styles.boldText}>{fullName}</Text>
          </View>
          <View style={{ width: 140 }}>
            <Text style={styles.boldText}>{formattedDate}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 65 }}>
            <CheckBox id={id} checkValue={itemData.selected} onCheck={onSelected} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ExistingClientItemTableItem;

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
