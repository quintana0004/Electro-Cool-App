import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Colors from "../../constants/Colors/Colors";

import Figures from "../../constants/figures/Figures";

function CBToggleButtons({ toggleActiveCategory, activeCategory }) {
  const [isClientsActive, setIsClientsActive] = useState(
    activeCategory === "Clients"
  );
  const [isVehiclesActive, setIsVehiclesActive] = useState(
    activeCategory === "Vehicles"
  );
  const [isInvoicesActive, setIsInvoicesActive] = useState(
    activeCategory === "Invoices"
  );

  function toggleButtonState(id) {
    if (id === "Clients") {
      setIsClientsActive(true);
      setIsVehiclesActive(false);
      setIsInvoicesActive(false);
      toggleActiveCategory("Clients");
    } else if (id === "Vehicles") {
      setIsVehiclesActive(true);
      setIsInvoicesActive(false);
      setIsClientsActive(false);
      toggleActiveCategory("Vehicles");
    } else if (id === "Invoices") {
      setIsInvoicesActive(true);
      setIsClientsActive(false);
      setIsVehiclesActive(false);
      toggleActiveCategory("Invoices");
    }
  }

  function toggleClientsButtonStyles() {
    if (isClientsActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  function toggleVehiclesButtonStyles() {
    if (isVehiclesActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  function toggleInvoicesButtonStyles() {
    if (isInvoicesActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  return (
    <View style={styles.toggleButtonsContainer}>
      <View style={styles.toggleButtonGroup}>
        <Pressable
          style={toggleClientsButtonStyles()}
          onPress={toggleButtonState.bind(this, "Clients")}
        >
          <Image source={Figures.UserIcon} />
          <Text style={styles.toggleButtonText}>Clients</Text>
        </Pressable>
        <Pressable
          style={toggleVehiclesButtonStyles()}
          onPress={toggleButtonState.bind(this, "Vehicles")}
        >
          <Image source={Figures.ClientCarsIcon} />
          <Text style={styles.toggleButtonText}>Vehicle</Text>
        </Pressable>
        <Pressable
          style={toggleInvoicesButtonStyles()}
          onPress={toggleButtonState.bind(this, "Invoices")}
        >
          <Image source={Figures.ClientInvoicesIcon} />
          <Text style={styles.toggleButtonText}>Invoices</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default CBToggleButtons;

const styles = StyleSheet.create({
  toggleButtonsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 570,
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
    backgroundColor: Colors.brightGreen,
    borderRadius: 10,
  },
});
