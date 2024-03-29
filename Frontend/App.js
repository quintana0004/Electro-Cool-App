import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MenuStack from "./Navigation/Stack_Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";
import { registerTranslation, enGB } from "react-native-paper-dates";
import { navigationRef } from "./utils/navigationRef.util";

const queryClient = new QueryClient();
registerTranslation("en-GB", enGB);

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <NavigationContainer ref={navigationRef}>
            <MenuStack />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </>
  );
}
