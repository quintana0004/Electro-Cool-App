// Navigation Library
import { NavigationContainer } from "@react-navigation/native";

//Screens
import MenuDrawer from "./components/navigation/drawer";

function App() {
  return (
    <NavigationContainer>
      <MenuDrawer />
    </NavigationContainer>
  );
}

export default App;
