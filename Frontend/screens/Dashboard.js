import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import Figures from "../constants/figures/Figures";
import { Appbar, Modal } from "react-native-paper";
import TheComponent from "../components/DashboardDetail/DashboardTable";

function Dashboard({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the current date every second
  setInterval(() => {
    setCurrentDate(new Date());
  }, 1000);
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
        <View style={styles.containerHeader1}>
          <TheComponent
            testfigure={Figures.Wheel}
            FirstText={<Text>Current Vehicles Working With</Text>}
            SecondText={<Text>150</Text>}
            HeightIcon={50}
            WidthIcon={50}
            Choice={1}
          />
          {
            //Multiple buttons area
          }
          <TheComponent
            testfigure={Figures.Vehicle}
            FirstText={<Text>Cars Pending Confirmation</Text>}
            SecondText={<Text>Invoice</Text>}
            HeightBig={120}
            WidthBig={143}
            MarginTableTop={15}
            Choice={2}
          />

          <TheComponent
            testfigure={Figures.NewIconDashboard}
            FirstText={<Text>New Vehicles Received Today</Text>}
            SecondText={<Text>150</Text>}
            HeightIcon={52}
            WidthIcon={50}
            Choice={1}
          />
          {
            //Remember tienes que cambiar las variables de los styles to make it work correctly
          }
          {
            //Fourth Button area
          }
          <TheComponent
            testfigure={Figures.Vehicle}
            FirstText={<Text>New Vehicles Received Today</Text>}
            SecondText={<Text>150</Text>}
            HeightIcon={45}
            WidthIcon={65}
            Choice={1}
          />
          {
            //Another view in order to allow scrollview to work as pages instead of scrolling normally.
          }
          <View style={styles.containerHeader1}>
            <TheComponent
              testfigure={Figures.NewIconDashboard}
              FirstText={<Text>New Vehicles Received Today</Text>}
              SecondText={<Text>150</Text>}
              HeightIcon={52}
              WidthIcon={50}
              Choice={1}
            />
            <TheComponent
              testfigure={Figures.NewIconDashboard}
              FirstText={<Text>New Vehicles Received Today</Text>}
              SecondText={<Text>150</Text>}
              HeightIcon={52}
              WidthIcon={50}
              Choice={1}
            />
            <TheComponent
              testfigure={Figures.NewIconDashboard}
              FirstText={<Text>New Vehicles Received Today</Text>}
              SecondText={<Text>150</Text>}
              HeightIcon={52}
              WidthIcon={50}
              Choice={1}
            />
            <TheComponent
              testfigure={Figures.NewIconDashboard}
              FirstText={<Text>New Vehicles Received Today</Text>}
              SecondText={<Text>150</Text>}
              HeightIcon={52}
              WidthIcon={50}
              Choice={1}
            />
          </View>
        </View>
      </ScrollView>
      {
        // area containing seperate view in order to make scrollable work on previous view.
      }
      <View style={styles.containerHeader1}>
        <TheComponent
          testfigure={Figures.Vehicle}
          FirstText={<Text>Cars Pending Confirmation</Text>}
          SecondText={<Text>Invoice</Text>}
          HeightBig={65}
          WidthBig={270}
          HeightIcon={40}
          WidthIcon={42}
          Choice={3}
        />

        <TheComponent
          testfigure={Figures.Vehicle}
          FirstText={<Text>Cars Pending Confirmation</Text>}
          SecondText={<Text>Invoice</Text>}
          HeightBig={270}
          WidthBig={270}
          Choice={4}
          margin={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader1: {
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
