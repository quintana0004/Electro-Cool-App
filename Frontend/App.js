// Navigation Library
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";

//Screens
import MenuDrawer from "./components/navigation/drawer";

function App() {
  return (
    <>
      <NativeBaseProvider>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <MenuDrawer />
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
}

export default App;
