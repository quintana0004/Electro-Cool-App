import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import TableList from "../components/Invoices/TableList";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import ActionBtn from "../components/UI/ActionBtn";
import FilterBtn from "../components/UI/FilterBtn";
import Header from "../components/UI/Header";
import Colors from "../constants/Colors/Colors";
import Figures from "../constants/figures/Figures";

function Invoices({ navigation }) {
  const [isInvoiceActive, setIsInvoiceActive] = useState(false);
  const [isDepositActive, setIsDepositActive] = useState(false);

  function toggleInvoiceButtonStyles() {
    if (isInvoiceActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  function toggleDepositButtonStyles() {
    if (isDepositActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  function toggleButtonState(id) {
    if (id === "Invoice") {
      setIsInvoiceActive((prev) => !prev);
      if (isDepositActive) {
        setIsDepositActive((prev) => !prev);
      }
    } else if (id === "Deposit") {
      setIsDepositActive((prev) => !prev);
      if (isInvoiceActive) {
        setIsInvoiceActive((prev) => !prev);
      }
    }
  }

  return (
    <View>
      <Header divideH={6} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        {/* Action Buttons */}
        <View style={styles.actionButtonGroup}>
          <ActionBtn>Create Deposit</ActionBtn>

          <View style={styles.actionRightButtonGroup}>
            <FilterBtn image={Figures.FilterIcon} />
            <ActionBtn>Create Invoice</ActionBtn>
          </View>
        </View>

        {/* Create Invoice & Deposit Toggler */}
        <View style={styles.toggleButtonsContainer}>
          <View style={styles.toggleButtonGroup}>
            <Pressable
              style={toggleInvoiceButtonStyles()}
              onPress={toggleButtonState.bind(this, "Invoice")}
            >
              <Image source={Figures.InvoiceDollarIcon} />
              <Text style={styles.toggleButtonText}>Invoices</Text>
            </Pressable>

            <Pressable
              style={toggleDepositButtonStyles()}
              onPress={toggleButtonState.bind(this, "Deposit")}
            >
              <Image source={Figures.DepositDollarIcon} />
              <Text style={styles.toggleButtonText}>Deposit</Text>
            </Pressable>
          </View>
        </View>

        {/* Create Header For Invoice & Deposit List */}
        <TableList />
        {/* Create Invoice & Deposit List */}
        {/* Create Invoice & Desposit Rows */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 180,
    zIndex: -1,
  },
  actionButtonGroup: {
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionRightButtonGroup: {
    flexDirection: "row",
  },
  toggleButtonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  toggleButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    width: 190,
    height: "100%",
  },
  toggleButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: "rgba(248, 217, 134, 0.65)",
    borderRadius: 10,
  },
});

export default Invoices;
