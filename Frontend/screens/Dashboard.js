import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import MenuBtnNav from "../components/UI/MenuBtnNav";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Header from "../components/UI/Header";
import Colors from "../constants/Colors/Colors";

import { Provider, Menu, Divider, Button } from "react-native-paper";

function Dashboard({ navigation }) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.container}>
        <Header divideH={3.5} divideW={1} colorHeader={Colors.darkBlack}>
          <MenuDropDown />
          <View style={styles.content}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.user}>Code-eX</Text>
          </View>
        </Header>
        <View style={styles.body}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Show menu</Button>}
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    fontSize: 60,
    color: Colors.white,
    fontWeight: "600",
    textAlign: "right",
  },
  user: {
    fontSize: 60,
    color: Colors.brightYellow,
    fontWeight: "600",
    textAlign: "right",
  },
  content: {
    position: "absolute",
    top: 90,
    left: 400,
  },
  body: {
    zIndex: -1,
  },
});

export default Dashboard;
