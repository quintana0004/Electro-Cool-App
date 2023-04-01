<<<<<<< HEAD
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import ToggleButtonsCalendar from "../components/Calendar/ToggleButtonsCalendar";
import MenuDropDown from "../components/Navigation/MenuDropDown";
=======
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/UI/MenuDropDown";
>>>>>>> af7e9a23e07e629a3cc512e66c62efae1613847f
import Colors from "../constants/Colors/Colors";
import Appointments from "../screens/Calendar_Screens/Appointments";
import TaskDetail from "./Calendar_Screens/TaskDetail";

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
        {activeCategory === "Appointments" ? <Appointments /> : <TaskDetail />}
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
