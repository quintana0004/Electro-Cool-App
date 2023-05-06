import { Button, Dialog, Portal } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { StyleSheet, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function AccountConfirmationDialog({
  visibilityAccountConfirm,
  setVisibilityAccountConfirm,
}) {
  const navigation = useNavigation();

  return (
    <Portal>
      <Dialog
        visible={visibilityAccountConfirm}
        onDismiss={() => setVisibilityAccountConfirm(false)}
        style={{ backgroundColor: Colors.white }}
      >
        <Dialog.Icon icon="check-decagram" size={80} color={Colors.darkGreen} />
        <Dialog.Title style={styles.textAlert}>Create Account</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textAlert}>
            Once the account has been created must wait for the administrator to
            confirm user account.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={Colors.darkGreen}
            onPress={() => {
              setVisibilityAccountConfirm(false);
              navigation.navigate("LogIn");
            }}
          >
            Confirm
          </Button>
          <Button
            textColor={Colors.yellowDark}
            onPress={() => setVisibilityAccountConfirm(false)}
          >
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default AccountConfirmationDialog;

const styles = StyleSheet.create({
  textAlert: {
    textAlign: "center",
  },
});
