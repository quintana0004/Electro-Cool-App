import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import Figures from "../../constants/figures/Figures";

function ToggleButtons({ toggleActiveCategory, activeCategory }) {
  const [isInvoiceActive, setIsInvoiceActive] = useState(activeCategory === "Invoices");
  const [isDepositActive, setIsDepositActive] = useState(activeCategory === "Deposits");

  function toggleButtonState(id) {
    if (id === "Invoice" && isInvoiceActive === false) {
      setIsInvoiceActive((prev) => !prev);
      setIsDepositActive((prev) => !prev);
      toggleActiveCategory("Invoices");
    } else if (id === "Deposit" && isDepositActive === false) {
      setIsDepositActive((prev) => !prev);
      setIsInvoiceActive((prev) => !prev);
      toggleActiveCategory("Deposits");
    }
  }

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

  return (
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
  );
}

export default ToggleButtons;

const styles = StyleSheet.create({
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
