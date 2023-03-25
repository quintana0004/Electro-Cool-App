import { createStackNavigator } from "@react-navigation/stack";
import CarSelection from "../screens/BtnSelection/CarSelection";
import ClientSelection from "../screens/BtnSelection/CustomerSelection";
import Calendar from "../screens/Calendar";
import TaskScreen from "../screens/Calendar_Screens/TaskScreen";
import CalendarSelection from "../screens/BtnSelection/CalendarSelection";
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
        name="TaskScreen"
        component={TaskScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="CarSelection"
        component={CarSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <CalendarStack.Screen
        name="CalendarSelection"
        component={CalendarSelection}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </CalendarStack.Navigator>

  );
}

export default CalendarStackOption;