import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens for Job Order
//! Main Screen
import JobOrder from "../../screens/JobOrder";

//? Secondary Screens
import Create from "../../screens/Orders/Create";
import Edit from "../../screens/Orders/Edit";
import Views from "../../screens/Orders/Views";

//Screens for Invoices
//! Main Screen
import Invoice from "../../screens/Invoice";

//?Secondary Screens
import ClientCreate from "../../screens/invoices/ClientCreate";
import ClientView from "../../screens/invoices/ClientView";
import Pending from "../../screens/invoices/Pending";

//Screens for Client Book
//! Main Screen
import ClientBook from "../../screens/ClientBook";

//? Secondary Screens
import BookView from "../../screens/Client_B view/BookView";

const Stack = createNativeStackNavigator();

function JobOrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Job"
        component={JobOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="View" component={Views} />
    </Stack.Navigator>
  );
}

function InvoiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Client Create" component={ClientCreate} />
      <Stack.Screen name="Client View" component={ClientView} />
      <Stack.Screen name="Pending" component={Pending} />
    </Stack.Navigator>
  );
}

function ClientBookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Book"
        component={ClientBook}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Book View" component={BookView} />
    </Stack.Navigator>
  );
}

export { JobOrderStack, InvoiceStack, ClientBookStack };
