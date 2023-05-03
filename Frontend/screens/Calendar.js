import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import Appbar from "react-native-paper/src/components/Appbar";
import ToggleButtonsCalendar from "../components/Calendar/ToggleButtonsCalendar";
import TableListTasks from "../components/Calendar/TableListTasks";
import SearchBanner from "../components/UI/SearchBanner";
import { StackActions } from "@react-navigation/native";
import TableListAppointments from "../components/Calendar/TableListAppointments";
import { useJobOrderStore } from "../Store/JobOrderStore";

function Calendar({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Appointments");
  const setPageSelection = useJobOrderStore((state) => state.setJobOrder);
  const [openBannerSearch, setOpenBannerSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const pageAction = StackActions.push("CalendarSelection");

  //Initialize Function and set

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

        <Appbar.Action
          icon="plus"
          onPress={() => {
            setPageSelection("Create", false, false, false);
            navigation.navigate("CalendarSelection");
          }}
        />
      </Appbar.Header>
      <SearchBanner
        visible={openBannerSearch}
        loading={searchLoading}
        placeholder={"Search by Name"}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />

      <View style={styles.container}>
        {activeCategory === "Appointments" ? (
          <TableListAppointments />
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
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default Calendar;
