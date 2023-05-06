import Colors from "../../constants/Colors/Colors";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

function ErrorDialog({ dialogVisible, setDialogVisible, errorMSG }) {
  return (
    <Portal>
      <Dialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        style={{ backgroundColor: Colors.white }}
      >
        <Dialog.Icon
          icon="alert-circle-outline"
          size={80}
          color={Colors.darkRed}
        />
        <Dialog.Title style={styles.textAlert}>
          An Error Has Occurred
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textAlert}>{errorMSG}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={Colors.yellowDark}
            onPress={() => setDialogVisible(false)}
          >
            Okay
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default ErrorDialog;

const styles = StyleSheet.create({
  textAlert: {
    textAlign: "center",
  },
});
