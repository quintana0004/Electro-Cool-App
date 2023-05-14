import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import DashboardCurrentVehicles from "../components/Dashboard/DashboardCurrentVehicles";
import DashboardVehiclesInShopAndNotStarted from "../components/Dashboard/DashboardVehiclesInShopAndNotStarted";
import DashboardNewVehiclesReceived from "../components/Dashboard/DashboardNewVehiclesReceived";
import DashboardFinishedVehiclesToday from "../components/Dashboard/DashboardFinishedVehiclesToday";
import DashboardTotalAmountPaid from "../components/Dashboard/DashboardTotalAmountPaid";
import DashboardTotalAmountDraft from "../components/Dashboard/DashboardTotalAmountDraft";
import DashboardTotalAmountPending from "../components/Dashboard/DashboardTotalAmountPending";
import DashboardTotalAmountCancelled from "../components/Dashboard/DashboardTotalAmountCancelled";
import DashboardCardAppointment from "../components/Dashboard/DashboardCardAppointment";
import DashboardCardTask from "../components/Dashboard/DashboardCardTask";
import DashboardCarsPendingConfirmation from "../components/Dashboard/DashboardCarsPendingConfirmation";

function Dashboard({ navigation }) {
  const currentDate = new Date();

  return (
    <View>
      <Appbar.Header style={styles.HeaderContent} mode="center-aligned">
        <MenuDropDown />

        <Appbar.Content
          title="Welcome Back!"
          titleStyle={{ color: "white" }}
        ></Appbar.Content>
        <Appbar.Content
          title={currentDate.toDateString()}
          titleStyle={{ color: "white" }}
        ></Appbar.Content>
      </Appbar.Header>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scrollableContainer}>
          <DashboardCurrentVehicles />
          <DashboardVehiclesInShopAndNotStarted />
          <DashboardNewVehiclesReceived />
          <DashboardFinishedVehiclesToday />

          <DashboardTotalAmountPaid />
          <DashboardTotalAmountDraft />
          <DashboardTotalAmountPending />
          <DashboardTotalAmountCancelled />
        </View>
      </ScrollView>

      <View style={styles.scrollableContainer}>
        <DashboardCarsPendingConfirmation />

        <View>
          <DashboardCardAppointment />
          <DashboardCardTask />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollableContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  HeaderContent: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.black,
    zIndex: 8,
  },
});

export default Dashboard;
