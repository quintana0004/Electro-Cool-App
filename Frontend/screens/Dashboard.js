import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Figures from "../constants/figures/Figures";
import { Appbar } from "react-native-paper";
import DashboardTables from "../components/DashboardDetail/DashboardTable";
import DashboardCurrentVehicles from "../components/Dashboard/DashboardCurrentVehicles";
import DashboardVehiclesInShopAndNotStarted from "../components/Dashboard/DashboardVehiclesInShopAndNotStarted";

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

          {/*<DashboardTables*/}
          {/*  testfigure={Figures.NewIconDashboard}*/}
          {/*  FirstText={<Text>New Vehicles Received Today</Text>}*/}
          {/*  SecondText={<Text>150</Text>}*/}
          {/*  HeightIcon={52}*/}
          {/*  WidthIcon={50}*/}
          {/*  Choice={1}*/}
          {/*  SecondTextSize={55}*/}
          {/*/>*/}
          <DashboardCurrentVehicles
            Title={"Current Vehicles Working With"}
            ImageIcon={Figures.Wheel}
            HeightIcon={50}
            WidthIcon={50}
            CountFontSize={55}
          />
          {
            //Remember tienes que cambiar las variables de los styles to make it work correctly
          }
          {
            //Fourth Button area
          }
          {/*<DashboardTables*/}
          {/*  testfigure={Figures.Vehicle}*/}
          {/*  FirstText={<Text>New Vehicles Received Today</Text>}*/}
          {/*  SecondText={<Text>150</Text>}*/}
          {/*  HeightIcon={45}*/}
          {/*  WidthIcon={65}*/}
          {/*  Choice={1}*/}
          {/*  SecondTextSize={55}*/}
          {/*/>*/}
          <DashboardCurrentVehicles
            Title={"Current Vehicles Working With"}
            ImageIcon={Figures.Wheel}
            HeightIcon={50}
            WidthIcon={50}
            CountFontSize={55}
          />
          {
            //Another view in order to allow scrollview to work as pages instead of scrolling normally.
          }

          <DashboardTables
            testfigure={Figures.MoneyHand}
            FirstText={<Text>Total Amount in Paid Today</Text>}
            SecondText={<Text>$20,541.45</Text>}
            HeightIcon={82}
            WidthIcon={80}
            Choice={5}
            SecondTextSize={20}
            ThirdText={<Text>AMT</Text>}
            FourthText={<Text>48</Text>}
          />
          {/*<DashboardTables*/}
          {/*  testfigure={Figures.totalDraft}*/}
          {/*  FirstText={<Text>Total Amount in Drafts</Text>}*/}
          {/*  SecondText={<Text>150</Text>}*/}
          {/*  HeightIcon={52}*/}
          {/*  WidthIcon={50}*/}
          {/*  Choice={1}*/}
          {/*  SecondTextSize={55}*/}
          {/*/>*/}
          <DashboardCurrentVehicles
            Title={"Current Vehicles Working With"}
            ImageIcon={Figures.Wheel}
            HeightIcon={50}
            WidthIcon={50}
            CountFontSize={55}
          />
          <DashboardTables
            testfigure={Figures.totalAmountPending}
            FirstText={<Text>Total Amount in Pending Today</Text>}
            SecondText={<Text>$20,541.45</Text>}
            HeightIcon={62}
            WidthIcon={60}
            Choice={5}
            SecondTextSize={20}
            ThirdText={<Text>AMT</Text>}
            FourthText={<Text>48</Text>}
          />
          {/*<DashboardTables*/}
          {/*  testfigure={Figures.totalAmountCancelled}*/}
          {/*  FirstText={<Text>Total Amount in Cancelled</Text>}*/}
          {/*  SecondText={<Text>150</Text>}*/}
          {/*  HeightIcon={52}*/}
          {/*  WidthIcon={50}*/}
          {/*  Choice={1}*/}
          {/*  SecondTextSize={55}*/}
          {/*/>*/}
          <DashboardCurrentVehicles
            Title={"Current Vehicles Working With"}
            ImageIcon={Figures.Wheel}
            HeightIcon={50}
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
          SecondTextSize={15}
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
