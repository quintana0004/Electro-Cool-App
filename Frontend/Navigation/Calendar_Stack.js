import { createStackNavigator } from "@react-navigation/stack";
import CarSelection from "../screens/BtnSelection/CarSelection";
import ClientSelection from "../screens/BtnSelection/CustomerSelection";
import Calendar from "../screens/Calendar";
import CalendarSelection from "../screens/BtnSelection/CalendarSelection";
import VehicleInformation from "../screens/JobOrder_Screens/Vehicle_Information";
import ClientInformation from "../screens/JobOrder_Screens/Client_Information";
import ExistingClient from "../screens/SearchExisting/ExistingClient";
import ExistingCar from "../screens/SearchExisting/ExistingCar";
import CreateAppointments from "../screens/Calendar_Screens/CreateAppointments";
const CalendarStack = createStackNavigator();

function CalendarStackOption() {
  return (
    <CalendarStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <CalendarStack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="ClientSelection"
        component={ClientSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="CarSelection"
        component={CarSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="ClientInformation"
        component={ClientInformation}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="VehicleInformation"
        component={VehicleInformation}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="CalendarSelection"
        component={CalendarSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="ExistingClient"
        component={ExistingClient}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="ExistingCar"
        component={ExistingCar}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="CreateAppointments"
        component={CreateAppointments}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarStackOption;
