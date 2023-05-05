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
import ModalDropdown from "react-native-modal-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function ModalPicker({ visible, setVisible, firstName, lastName }) {
  const [pickedRole, setPickedRole] = useState(0);

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: Colors.white }}
        >
          <View
            style={{
              backgroundColor: Colors.lightGreenMoney,
              marginHorizontal: 20,
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 20,
                marginBottom: 15,
              }}
            >
              Choose a role for {firstName} {lastName}
            </Text>
            <View style={{ width: 200, marginLeft: 130 }}>
              <ModalDropdown
                options={["Option", "Admin", "Temporary Admin"]}
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  padding: 5,
                }}
                textStyle={{ fontSize: 20 }}
                onSelect={(value) => setPickedRole(value)}
                dropdownTextStyle={{ fontSize: 20 }}
              />
            </View>
            {pickedRole === 1 && (
              <View
                style={{
                  backgroundColor: "#F7F7F7",
                  borderWidth: 2,
                  borderColor: "#939393",
                  borderRadius: 10,
                  paddingHorizontal: 50,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    marginVertical: 5,
                    marginTop: 10,
                  }}
                >
                  Full access to delete, create and edit the following:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    paddingHorizontal: 50,
                  }}
                >
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Dashboard
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Invoices
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Client Book
                    </Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Job Orders
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Calendar
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Setting
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {pickedRole === 2 && (
              <View
                style={{
                  backgroundColor: "#F7F7F7",
                  borderWidth: 2,
                  borderColor: "#939393",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 10,
                  paddingHorizontal: 50,
                  marginTop: 20,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Only access to create and edit the following:
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Dashboard - Job Order Info on analytics
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Job Orders
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Invoices
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Calendar
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Setting - Personal Profile Access
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Dialog.Actions>
            <Button
              textColor={Colors.darkGreen}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>

            <Button
              textColor={Colors.darkGreen}
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
