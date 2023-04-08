import { View, Text, Pressable, StyleSheet } from "react-native";
import CheckBox from "../UI/Checkbox";
import { MaskedText } from "react-native-mask-text";
import { format } from "date-fns";
import { useState } from "react";

function InvoiceDetailModalListItem({ itemData, onSelectedDeposit, onRemovedDeposit }) {

  const { id, fullName, createdDate, amountTotal } = itemData;
  const formattedAmountTotal = amountTotal * 100;

  function DateText() {
    return format(new Date(createdDate), "MM/dd/yyyy");
  }

  const [selected, setSelected] = useState(false);

  function onCheck(_, value) {
    if (value === true) {
      onSelectedDeposit(itemData);
    }
    else {
      onRemovedDeposit(itemData);
    }

    setSelected(value);
  }

  return (
    <View>
      <Pressable>
        <View style={styles.container}>
          <View style={{ width: 30, marginLeft: 30 }}>
            <Text style={styles.boldText}>{id}</Text>
          </View>
          <View style={{ width: 100, marginLeft: 30 }}>
            <Text style={styles.boldText}>{fullName}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 25 }}>
            <Text style={styles.boldText}>{DateText()}</Text>
          </View>
          <View style={{ width: 70, marginLeft: 30 }}>
            <Text style={styles.boldText}>
              <MaskedText
                type="currency"
                options={{
                  prefix: "$",
                  decimalSeparator: ".",
                  groupSeparator: ",",
                  precision: 2,
                }}
                style={styles.boldText}
              >
                {formattedAmountTotal}
              </MaskedText>
            </Text>
          </View>
          <View style={{ width: 80, marginLeft: 30 }}>
            <CheckBox id={id} checkValue={selected} onCheck={onCheck} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default InvoiceDetailModalListItem;

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
    fontWeight: "normal",
    fontSize: 14,
  },
});
