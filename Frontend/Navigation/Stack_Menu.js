import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens to connect
import Dashboard from "../screens/Dashboard";
import Calendar from "../screens/Calendar";
import ClientBook from "../screens/ClientBook";
import Setting from "../screens/Settings";
import JobOrderStackOption from "./JobOrder_Stack";
import InvoiceStackOption from "./Invoice_Stack";
import ClientBookStackOption from "./ClientBook_Stack";
import CalendarStackOption from "./Calendar_Stack";
//Connection navigator stack
const Stack = createStackNavigator();

function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
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
        component={InvoiceStackOption}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="ClientBook"
        component={ClientBookStackOption}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarStackOption}
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
