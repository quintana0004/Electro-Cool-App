import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import TableList from "../components/Invoices/TableList";
import ToggleButtons from "../components/Invoices/ToggleButtons";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import ActionBtn from "../components/UI/ActionBtn";
import FilterBtn from "../components/UI/FilterBtn";
import Header from "../components/UI/Header";
import Colors from "../constants/Colors/Colors";
import Figures from "../constants/figures/Figures";

function Invoices({ navigation }) {
  const [isInvoiceActive, setIsInvoiceActive] = useState(true);
  const [isDepositActive, setIsDepositActive] = useState(false);

  function toggleButtonState(id) {
    if (id === "Invoice" && isInvoiceActive === false) {
      setIsInvoiceActive((prev) => !prev);
      setIsDepositActive((prev) => !prev);
    } else if (id === "Deposit" && isDepositActive === false) {
      setIsDepositActive((prev) => !prev);
      setIsInvoiceActive((prev) => !prev);
    }
  }

  return (
    <View>
      <Header divideH={6} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        <View style={styles.actionButtonGroup}>
          <ActionBtn>Create Deposit</ActionBtn>

          <View style={styles.actionRightButtonGroup}>
            <FilterBtn image={Figures.FilterIcon} />
            <ActionBtn>Create Invoice</ActionBtn>
          </View>
        </View>

        <View>
          <ToggleButtons
            isInvoiceActive={isInvoiceActive}
            isDepositActive={isDepositActive}
            toggleButtonState={toggleButtonState}
          />
        </View>

        <View>
          <TableList tableData={DUMMY_DATA} />
        </View>
      </View>
    </View>
  );
}

export default Invoices;

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
});

// --- Dummy Data ---
const DUMMY_DATA = [
  {
    id: 10000,
    firstName: "Jan",
    lastName: "Montalvo",
    date: "2023-12-22T21:46:33.206Z",
    totalPrice: 56.7,
    status: "In Draft",
  },
  {
    id: 10001,
    firstName: "Jessica",
    lastName: "Quintana",
    date: "2022-12-26T21:46:33.206Z",
    totalPrice: 156.7,
    status: "Paid",
  },
  {
    id: 100002,
    firstName: "Luis",
    lastName: "Telemaco",
    date: "2022-12-24T21:46:33.206Z",
    totalPrice: 541.7,
    status: "Pending",
  },
  {
    id: 10003,
    firstName: "Hector",
    lastName: "Montalvo Medina",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 14048.7,
    status: "Canceled",
  },
  {
    id: 10004,
    firstName: "Test",
    lastName: "Montalvo",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 14048.7,
    status: "In Draft",
  },
  {
    id: 10005,
    firstName: "Leslie",
    lastName: "Figueroa",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 1448.7,
    status: "Canceled",
  },
  {
    id: 10006,
    firstName: "Ramon",
    lastName: "Figueroa",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 1448.7,
    status: "Pending",
  },
  {
    id: 10007,
    firstName: "Natalia",
    lastName: "Rivera",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 1448.7,
    status: "In Draft",
  },
  {
    id: 10008,
    firstName: "Valeria",
    lastName: "Medina",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 1448.7,
    status: "In Draft",
  },
];
