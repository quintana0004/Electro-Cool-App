import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MenuStack from "./Navigation/Stack_Menu";

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <MenuStack />
      </NavigationContainer>
    </>
  );
}
