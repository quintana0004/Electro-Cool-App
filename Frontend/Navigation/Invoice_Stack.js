import { createStackNavigator } from "@react-navigation/stack";
import Invoices from "../screens/Invoices";
import ExistingClient from "../screens/Invoice_Screens/ExistingClient";
import ExistingCar from "../screens/Invoice_Screens/ExistingCar";

const InvoiceStack = createStackNavigator();

function InvoiceStackOption() {
  return (
    <InvoiceStack.Navigator>
      <InvoiceStack.Screen
        name="InvoiceMain"
        component={Invoices}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <InvoiceStack.Screen
        name="ExistingClients"
        component={ExistingClient}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <InvoiceStack.Screen
        name="ExistingCars"
        component={ExistingCar}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </InvoiceStack.Navigator>
  );
}

export default InvoiceStackOption;
