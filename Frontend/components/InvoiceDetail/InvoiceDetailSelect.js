import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";
import { Dialog, Portal } from "react-native-paper";

const OPTIONS = ["N/A", "90 days", "1 year", "2 years"];

function InvoiceDetailSelect({ isInvoiceEditable, value, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const hideDialog = () => {
    setExpanded(false);
  };

  const handleOptionSelect = (option) => {
    setExpanded(false);
    onSelect(option);
  };

  const renderOption = (option) => (
    <Pressable
      key={option}
      onPress={() => handleOptionSelect(option)}
      style={styles.option}
    >
      <Text style={{ fontSize: 20 }}>{option}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} disabled={!isInvoiceEditable}>
        <View style={styles.select}>
          <Text style={{ fontSize: 14 }}>{value}</Text>
          <Octicons
            name="chevron-down"
            style={{ marginHorizontal: 5 }}
            size={22}
            color="black"
          />
        </View>
      </Pressable>
      <Portal>
        <Dialog visible={expanded} onDismiss={hideDialog}>
          <Text style={styles.dialogTitle}>Select Warranty</Text>
          <Dialog.ScrollArea style={styles.dialogContainer}>
            {OPTIONS.filter((option) => option !== value).map(renderOption)}
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.black,
    position: "relative",
    zIndex: Platform.OS === "ios" ? 99999 : undefined,
    elevation: Platform.OS === "android" ? 99999 : undefined,
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 2,
  },
  dialogTitle: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 25,
    fontWeight: "bold",
  },
  dialogContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default InvoiceDetailSelect;
