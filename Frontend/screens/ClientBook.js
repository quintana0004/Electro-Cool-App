import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import { Button } from "react-native-paper";

function ClientBook({ navigation }) {
  return (
    <View style={styles.container}>
      <Header divideH={8} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        <Text>Client Book Screen!</Text>
      </View>

      <View>
        <Pressable
          style={{ backgroundColor: Colors.brightYellow }}
          onPress={() => {
            navigation.navigate("ClientBookCustomer");
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
  },
  body: {
    zIndex: -1,
  },
});

export default ClientBook;
