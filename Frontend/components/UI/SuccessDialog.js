import Colors from "../../constants/Colors/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";

function SuccessDialog({
  dialogVisible,
  setDialogVisible,
  headerText,
  subHeaderText,
}) {
  return (
    <Portal>
      <Dialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        style={{ backgroundColor: Colors.white }}
      >
        <Dialog.Icon
          icon="check-circle-outline"
          size={80}
          color={Colors.darkGreen}
        />
        <Dialog.Title style={styles.headerText}>{headerText}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.subHeaderText}>{subHeaderText}</Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Pressable onPress={() => setDialogVisible(false)}>
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmText}>Confirm</Text>
            </View>
          </Pressable>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default SuccessDialog;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 18,
    textAlign: "center",
  },
  confirmBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 20,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
