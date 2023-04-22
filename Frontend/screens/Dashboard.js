import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MenuBtnNav from "../components/UI/MenuBtnNav";
import MenuDropDown from "../components/UI/MenuDropDown";
import Header from "../components/UI/Header";
import Colors from "../constants/Colors/Colors";

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Header divideH={3.5} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
        <View style={styles.content}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.user}>Code-eX</Text>
        </View>
      </Header>
      <View style={styles.body}>
        <Text>Dashboard Screen!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: "600",
    textAlign: "right",
  },
  user: {
    fontSize: 40,
    color: Colors.brightYellow,
    fontWeight: "600",
    textAlign: "right",
  },
  content: {
    position: "absolute",
    top: 90,
    left: 255,
  },
  body: {
    zIndex: -1,
  },
});

export default Dashboard;
