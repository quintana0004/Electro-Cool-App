import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import ClientBook from "../screens/ClientBook";
import ClientBookCustomer from "../screens/ClientBook_Screens/ClientBookCustomer";

const ClientBookStack = createStackNavigator();

function ClientBookStackOption() {
  return (
    <ClientBookStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <ClientBookStack.Screen
        name="ClientBook"
        component={ClientBook}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <ClientBookStack.Screen
        name="ClientBookCustomer"
        component={ClientBookCustomer}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </ClientBookStack.Navigator>
  );
}

export default ClientBookStackOption;
