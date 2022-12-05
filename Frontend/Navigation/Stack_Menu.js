import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens to connect
import Dashboard from "../screens/Dashboard";
import Invoices from "../screens/Invoices";
import Calendar from "../screens/Calendar";
import ClientBook from "../screens/ClientBook";
import Setting from "../screens/Settings";
import JobOrderStackOption from "./JobOrder_Stack";

//Connection navigator stack
const Stack = createStackNavigator();

function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="JobOrders"
        component={JobOrderStackOption}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Invoices"
        component={Invoices}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="ClientBook"
        component={ClientBook}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}

export default MenuStack;
