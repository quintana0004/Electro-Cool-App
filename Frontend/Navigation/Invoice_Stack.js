import { createStackNavigator } from "@react-navigation/stack";
import Invoices from "../screens/Invoices";
import ExistingClient from "../screens/Invoice_Screens/ExistingClient";
import ExistingCar from "../screens/Invoice_Screens/ExistingCar";
import InvoiceDetail from "../screens/Invoice_Screens/InvoiceDetail";
import DepositDetail from "../screens/Deposits_Screens/DepositDetail";

const InvoiceStack = createStackNavigator();

function InvoiceStackOption() {
  return (
    <InvoiceStack.Navigator screenOptions={{ cardStyle: { backgroundColor: "white" } }}>
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
      <InvoiceStack.Screen
        name="InvoiceDetail"
        component={InvoiceDetail}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <InvoiceStack.Screen
        name="DepositDetail"
        component={DepositDetail}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </InvoiceStack.Navigator>
  );
}

export default InvoiceStackOption;