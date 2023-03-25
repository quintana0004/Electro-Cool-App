import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import ToggleButtonsCalendar from "../components/Calendar/ToggleButtonsCalendar";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import Appointments from "../components/Calendar/Appointments";

function Calendar({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Appointments");
  const [openBannerSearch, setOpenBannerSearch] = useState(false);

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />
        <View>
          <ToggleButtonsCalendar
            toggleActiveCategory={updateActiveCategory}
            activeCategory={activeCategory}
          />
        </View>

        <Appbar.Content></Appbar.Content>
        <Appbar.Action icon="plus" onPress={() => {}} />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setOpenBannerSearch(!openBannerSearch);
          }}
        />
      </Appbar.Header>

      <View style={styles.container}>
        <Appointments />
      </View>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  body: {
    marginTop: 180,
    zIndex: -1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
  container: {
    width: 600,
    height: 800,
    zIndex: -1,
  },
});
