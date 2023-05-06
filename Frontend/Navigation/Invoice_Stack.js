import { createStackNavigator } from "@react-navigation/stack";
import Invoices from "../screens/Invoices";
import ExistingCar from "../screens/SearchExisting/ExistingCar";
import ExistingClient from "../screens/SearchExisting/ExistingClient";
import InvoiceDetail from "../screens/Invoice_Screens/InvoiceDetail";
import DepositDetail from "../screens/Deposits_Screens/DepositDetail";
import DepositPayment from "../screens/Deposits_Screens/DepositPayment";
import InvoicePayment from "../screens/Invoice_Screens/InvoicePayment";

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
        name="InvoicePayment"
        component={InvoicePayment}
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
      <InvoiceStack.Screen
        name="DepositPayment"
        component={DepositPayment}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </InvoiceStack.Navigator>
  );
}

export default InvoiceStackOption;
