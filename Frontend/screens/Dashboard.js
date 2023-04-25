import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Figures from "../constants/figures/Figures";
import { Appbar } from "react-native-paper";
import DashboardTables from "../components/DashboardDetail/DashboardTable";
import DashboardCurrentVehicles from "../components/Dashboard/DashboardCurrentVehicles";
import DashboardVehiclesInShopAndNotStarted from "../components/Dashboard/DashboardVehiclesInShopAndNotStarted";
import DashboardNewVehiclesReceived from "../components/Dashboard/DashboardNewVehiclesReceived";
import DashboardFinishedVehiclesToday from "../components/Dashboard/DashboardFinishedVehiclesToday";
import DashboardTotalAmountPaid from "../components/Dashboard/DashboardTotalAmountPaid";
import DashboardTotalAmountDraft from "../components/Dashboard/DashboardTotalAmountDraft";
import DashboardTotalAmountPending from "../components/Dashboard/DashboardTotalAmountPending";
import DashboardTotalAmountCancelled from "../components/Dashboard/DashboardTotalAmountCancelled";
// TODO:
// * Create a Flat List so we can dynamically render the Invoices.
//    - Develop a Flat List Component (DashboardInvoiceTableList)
//    - Develop a Item to Render (DashboardInvoiceTableListItem)
// * Develop Scroll Functionality for the Invoices List.
// * Create a Flat List for the Invoice Items.
//    - Develop a Flat List Component (DashboardInvoiceItemTableList)
//    - Develop a Item to Render (DashboardInvoiceItemTableListItem)

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
          <DashboardCurrentVehicles
            Title={"Current Vehicles Working With"}
            ImageIcon={Figures.Wheel}
            HeightIcon={50}
            WidthIcon={50}
            CountFontSize={55}
          />
          {
            //Multiple buttons area
          }

          <DashboardVehiclesInShopAndNotStarted />

          <DashboardNewVehiclesReceived
            Title={"New Vehicles Received Today"}
            ImageIcon={Figures.NewIconDashboard}
            HeightIcon={52}
            WidthIcon={50}
            CountFontSize={55}
          />

          {
            //Fourth Button area
          }

          <DashboardFinishedVehiclesToday
            Title={"Finished Vehicle of Today"}
            ImageIcon={Figures.Vehicle}
            HeightIcon={45}
            WidthIcon={65}
            CountFontSize={55}
          />
          {
            //Another view in order to allow scrollview to work as pages instead of scrolling normally.
          }
          <DashboardTotalAmountPaid
            Title={"Total Amount in Paid Today"}
            ImageIcon={Figures.MoneyHand}
            HeightIcon={82}
            WidthIcon={80}
            CountFontSize={55}
          />

          <DashboardTotalAmountDraft
            Title={"Total Amount in Drafts"}
            ImageIcon={Figures.totalDraft}
            HeightIcon={62}
            WidthIcon={60}
            CountFontSize={55}
          />
          <DashboardTotalAmountPending
            Title={"Total Amount in Pending Today"}
            ImageIcon={Figures.totalAmountPending}
            HeightIcon={62}
            WidthIcon={60}
            CountFontSize={55}
          />
          <DashboardTotalAmountCancelled
            Title={"Total Amount in Cancelled"}
            ImageIcon={Figures.totalAmountCancelled}
            HeightIcon={52}
            WidthIcon={50}
            CountFontSize={55}
          />
        </View>
      </ScrollView>
      {
        // area containing seperate view in order to make scrollable work on previous view.
      }
      <View style={styles.scrollableContainer}>
        <DashboardTables
          FirstText={<Text>Cars Pending Confirmation</Text>}
          SecondText={<Text>Invoice</Text>}
          HeightBig={65}
          WidthBig={270}
          HeightIcon={40}
          WidthIcon={42}
          Choice={3}
        />

        <DashboardTables
          testfigure={Figures.totalAmountAppointments}
          FirstText={<Text>Cars Pending Confirmation</Text>}
          SecondText={<Text>Invoice</Text>}
          HeightBig={270}
          WidthBig={270}
          Choice={4}
          margin={5}
          testfigure2={Figures.totalAmountTasks}
          SecondTextSize={20}
        />
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
