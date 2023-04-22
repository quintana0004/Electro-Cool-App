import { createStackNavigator } from "@react-navigation/stack";
import ClientBook from "../screens/ClientBook";
import CustomerInformation from "../screens/ClientBook_Screens/CustomerInformation";

const ClientBookStack = createStackNavigator();

function ClientBookStackOption() {
  return (
    <ClientBookStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <ClientBookStack.Screen
        name="ClientBookMain"
        component={ClientBook}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <ClientBookStack.Screen
        name="CustomerInformation"
        component={CustomerInformation}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </ClientBookStack.Navigator>
  );
}

export default ClientBookStackOption;
