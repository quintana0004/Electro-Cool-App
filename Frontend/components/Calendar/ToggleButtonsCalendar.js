import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function ToggleButtons({ toggleActiveCategory, activeCategory }) {
  const [isAppointmentsActive, setIsAppointmentsActive] = useState(
    activeCategory === "Appointments"
  );
  const [isTasksActive, setIsTasksActive] = useState(
    activeCategory === "Tasks"
  );

  function toggleButtonState(id) {
    if (id === "Appointments" && isAppointmentsActive === false) {
      setIsAppointmentsActive((prev) => !prev);
      setIsTasksActive((prev) => !prev);
      toggleActiveCategory("Appointments");
    } else if (id === "Tasks" && isTasksActive === false) {
      setIsAppointmentsActive((prev) => !prev);
      setIsTasksActive((prev) => !prev);
      toggleActiveCategory("Tasks");
    }
  }

  function toggleAppointmentsButtonStyles() {
    if (isAppointmentsActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  function toggleTasksButtonStyles() {
    if (isTasksActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  return (
    <View style={styles.toggleButtonsContainer}>
      <View style={styles.toggleButtonGroup}>
        <Pressable
          style={toggleAppointmentsButtonStyles()}
          onPress={toggleButtonState.bind(this, "Appointments")}
        >
          <Text style={styles.toggleButtonText}>Appointments</Text>
        </Pressable>

        <Pressable
          style={toggleTasksButtonStyles()}
          onPress={toggleButtonState.bind(this, "Tasks")}
        >
          <Text style={styles.toggleButtonText}>Tasks</Text>
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
    zIndex: -1,
  },
  toggleButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 9,
    left: 8,
    backgroundColor: "white",
    height: 43,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 190,
    height: "100%",
  },
  toggleButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -2,
  },
  activeButton: {
    backgroundColor: "rgba(248, 217, 134, 0.65)",
    borderRadius: 7,
  },
});
