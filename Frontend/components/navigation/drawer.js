import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Screens
import {
  JobOrderStack,
  InvoiceStack,
  ClientBookStack,
} from "../navigation/stack";

import Home from "../../screens/Home";
import Calendar from "../../screens/Calendar";
import Setting from "../../screens/Setting";

const Drawer = createDrawerNavigator();

function MenuDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Job Order" component={JobOrderStack} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="Invoices" component={InvoiceStack} />
      <Drawer.Screen name="Client Book" component={ClientBookStack} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
}

export default MenuDrawer;
