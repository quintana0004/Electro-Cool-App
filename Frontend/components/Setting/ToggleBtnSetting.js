import { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useAccountUser } from "../../Store/AccountStore";

import Figures from "../../constants/figures/Figures";
import Colors from "../../constants/Colors/Colors";

function ToggleBtnSetting({ toggleActiveCategory, activeCategory }) {
  const [isProfileActive, setIsProfileActive] = useState(
    activeCategory === "Profile"
  );
  const [isRBACActive, setIsRBACActive] = useState(activeCategory === "RBAC");

  const role = useAccountUser((state) => state.role);

  function toggleButtonState(id) {
    if (id === "Profile" && isProfileActive === false) {
      setIsProfileActive((prev) => !prev);
      setIsRBACActive((prev) => !prev);
      toggleActiveCategory("Profile");
    } else if (id === "RBAC" && isRBACActive === false) {
      setIsRBACActive((prev) => !prev);
      setIsProfileActive((prev) => !prev);
      toggleActiveCategory("RBAC");
    }
  }

  function toggleInvoiceButtonStyles() {
    if (isProfileActive) {
      return [styles.toggleButton, styles.activeButton];
    } else {
      return [styles.toggleButton];
    }
  }

  function toggleDepositButtonStyles() {
    if (isRBACActive) {
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
          onPress={toggleButtonState.bind(this, "Profile")}
        >
          <Image source={Figures.User} style={{ width: 30, height: 30 }} />
          <Text style={styles.toggleButtonText}>Profile</Text>
        </Pressable>

        {role === "Admin" && (
          <Pressable
            style={toggleDepositButtonStyles()}
            onPress={toggleButtonState.bind(this, "RBAC")}
          >
            <Image
              source={Figures.UserRole}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.toggleButtonText}>Role</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default ToggleBtnSetting;

const styles = StyleSheet.create({
  toggleButtonsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 70,
  },
  toggleButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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
