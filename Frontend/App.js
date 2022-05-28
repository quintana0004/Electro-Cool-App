// Navigation Library
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

//Screens
import MenuDrawer from "./components/navigation/drawer";

function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <MenuDrawer />
      </NavigationContainer>
    </>
  );
}

export default App;
