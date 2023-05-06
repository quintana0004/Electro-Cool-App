import { Pressable, StyleSheet, Text, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";

function PaymentConfirmationDialog({ 
  title, 
  body, 
  isDialogVisible, 
  setIsDialogVisible, 
  onCancel, 
  onConfirm 
}) {
  return (
    <Portal>
      <Dialog 
        visible={isDialogVisible} 
        onDismiss={() => setIsDialogVisible(false)} 
        style={styles.dialog}
      >

        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <Pressable onPress={onCancel}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={onConfirm}>
              <View style={styles.confirmBtn}>
                <Text style={styles.confirmText}>
                  Okay
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

      </Dialog>
    </Portal>
  )
}

export default PaymentConfirmationDialog;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.white,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20
  },
  contentContainer: {
    backgroundColor: "rgba(208, 232, 232, 0.5);",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    textAlign: "center"
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
  },
  cancelBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(19, 138, 140, 0.25);",
    borderColor: Colors.brightGreen,
    borderWidth: 2,
    borderRadius: 15
  },
  cancelText: {
    color: Colors.brightGreen,
    fontWeight: "bold",
    fontSize: 18,
  },
  confirmBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 15,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  }
});
