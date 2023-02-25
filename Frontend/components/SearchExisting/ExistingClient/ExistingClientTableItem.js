import { View, Text, Pressable, StyleSheet } from "react-native";
import CheckBox from "../../UI/Checkbox";

function ExistingClientItemTableItem({ itemData, onSelected }) {
  const { id, firstName, lastName, phone } = itemData;
  const fullName = `${lastName}, ${firstName}`;
  const phoneFormatted = formatPhoneNumber(phone);

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  return (
    <View>
      <Pressable>
        <View style={styles.container}>
          <View style={{ width: 245, marginLeft: 20 }}>
            <Text style={styles.boldText}>{fullName}</Text>
          </View>
          <View style={{ width: 140 }}>
            <Text style={styles.boldText}>{phoneFormatted}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 80 }}>
            <CheckBox
              id={id}
              checkValue={itemData.selected}
              onCheck={onSelected}
            />
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
