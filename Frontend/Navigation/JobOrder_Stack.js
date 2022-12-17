import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import JobOrder from "../screens/JobOrders";
import ExistingCar from "../screens/SearchExisting/ExistingCar";
import ExistingClient from "../screens/SearchExisting/ExistingClient";
import ClientInformation from "../screens/JobOrder_Screens/Client_Information";
import CompanyPolicy from "../screens/JobOrder_Screens/Company_Policy";
import RequestedService from "../screens/JobOrder_Screens/Requested_Service";
import VehicleInformation from "../screens/JobOrder_Screens/Vehicle_Information";
import CustomerSelection from "../screens/BtnSelection/CustomerSelection";
import CarSelection from "../screens/BtnSelection/CarSelection";

//Connects the pages of Job Orders
const JobOrderStack = createStackNavigator();

function JobOrderStackOption() {
  return (
    <JobOrderStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <JobOrderStack.Screen
        name="JobOrderMain"
        component={JobOrder}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <JobOrderStack.Screen
        name="ExistingCar"
        component={ExistingCar}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="ExistingClient"
        component={ExistingClient}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="ClientInformation"
        component={ClientInformation}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="CompanyPolicy"
        component={CompanyPolicy}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="RequestedService"
        component={RequestedService}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="VehicleInformation"
        component={VehicleInformation}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="CarSelection"
        component={CarSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <JobOrderStack.Screen
        name="CustomerSelection"
        component={CustomerSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </JobOrderStack.Navigator>
  );
}

export default JobOrderStackOption;
