import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import { Appbar } from "react-native-paper";
import ToggleBtnSetting from "../components/Setting/ToggleBtnSetting";
import ProfilePage from "../components/Setting/ProfilePage";
import TableListSetting from "../components/Setting/TableListSetting";
import SearchBanner from "../components/UI/SearchBanner";

function Setting({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Profile");

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  //Search Variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [openBannerSearch, setOpenBannerSearch] = useState(false);

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />

        <ToggleBtnSetting
          toggleActiveCategory={updateActiveCategory}
          activeCategory={activeCategory}
        />
        {activeCategory === "RBAC" && (
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              setOpenBannerSearch(!openBannerSearch);
            }}
          />
        )}
      </Appbar.Header>
      <SearchBanner
        visible={openBannerSearch}
        loading={searchLoading}
        placeholder={"Search by ID or Name"}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />
      <View style={styles.body}>
        {activeCategory === "Profile" && <ProfilePage />}
        {activeCategory === "RBAC" && <TableListSetting />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
  textAlert: {
    textAlign: "center",
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
});

export default Setting;
