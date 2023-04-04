import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import Appointments from "../screens/Calendar_Screens/Appointments";
import Appbar from "react-native-paper/src/components/Appbar";
import ToggleButtonsCalendar from "../components/Calendar/ToggleButtonsCalendar";
import TableListTasks from "../components/Calendar/TableListTasks";

function Calendar({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Appointments");
  const [openBannerSearch, setOpenBannerSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />
        <Appbar.Content
          title={
            <ToggleButtonsCalendar
              toggleActiveCategory={updateActiveCategory}
              activeCategory={activeCategory}
            />
          }
        ></Appbar.Content>

        <Appbar.Action icon="plus" onPress={() => {}} />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setOpenBannerSearch(!openBannerSearch);
          }}
        />
      </Appbar.Header>

      <View style={styles.container}>
        {activeCategory === "Appointments" ? (
          <Appointments />
        ) : (
          <TableListTasks
            activeCategory={activeCategory}
            searchTerm={searchTerm}
            searchLoading={searchLoading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 180,
    zIndex: -1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: Colors.darkBlack,
    flexDirection: "row",
  },
  Menu: {
    flex: 1,
    alignItems: "stretch",
  },
  Buttons: { justifyContent: "center", alignItems: "center", width: 600 },
  Things: {
    flex: 1,
    alignItems: "stretch",
  },
  container: {
    height: "100%",
    zIndex: -1,
  },
});

export default Calendar;
