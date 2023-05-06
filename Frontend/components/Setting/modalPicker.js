import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import Colors from "../../constants/Colors/Colors";

function ModalPicker({ visible, setVisible }) {
  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: Colors.white }}
        >
          <View style={{ backgroundColor: Colors.lightGreenMoney }}></View>
          <Dialog.Actions>
            <Button
              textColor={Colors.yellowDark}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              textColor={Colors.yellowDark}
              onPress={() => setVisible(false)}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ModalPicker;
