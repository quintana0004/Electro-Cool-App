import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";

function Calendar({ navigation }) {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown style={{ zIndex: 4 }} />
        <Appbar.Content></Appbar.Content>
        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("CalendarSelection");
            //   navigation.dispatch(pageAction);
          }}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Calendar Screen!</Text>
      </View>
      <View>
        <Pressable
          style={{ backgroundColor: Colors.brightYellow }}
          onPress={() => {
            navigation.navigate("CalendarSelection");
          }}
        >
          <Text>Cabron</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default Calendar;
