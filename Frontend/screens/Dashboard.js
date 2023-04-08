import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Figures from "../constants/figures/Figures";
import { Appbar } from "react-native-paper";
import Peneerecto from "../components/DashboardDetail/DashboardTable";

function Dashboard({ navigation }) {
  return (
    <View>
      <Appbar.Header style={styles.HeaderContent} mode="center-aligned">
        <MenuDropDown />

        <Appbar.Content title="Electro Cool"></Appbar.Content>
      </Appbar.Header>

      <View style={styles.containerHeader1}>
        <Peneerecto
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
        <Peneerecto
          testfigure={Figures.NewIconDashboard}
          FirstText={<Text>New Vehicles Received Today</Text>}
          SecondText={<Text>150</Text>}
          ThirdText={<Text>Vehicles Not Started</Text>}
          FourthText={<Text>150</Text>}
          HeightIcon={52}
          WidthIcon={50}
          Choice={2}
          MarginTable={105}
          MarginTableTop={15}
          HeightSmallIcon={100}
        />
        <Peneerecto
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
        <Peneerecto
          testfigure={Figures.Vehicle}
          FirstText={<Text>New Vehicles Received Today</Text>}
          SecondText={<Text>150</Text>}
          HeightIcon={45}
          WidthIcon={65}
          Choice={1}
        />
        {
          //Fifth Button area
        }
        <Peneerecto
          testfigure={Figures.Vehicle}
          FirstText={<Text>Cars Pending Confirmation</Text>}
          SecondText={<Text>Invoice</Text>}
          HeightBig={65}
          WidthBig={270}
          HeightIcon={40}
          WidthIcon={42}
          Choice={3}
        />

        <Peneerecto
          testfigure={Figures.Vehicle}
          FirstText={<Text>Cars Pending Confirmation</Text>}
          SecondText={<Text>150</Text>}
          HeightBig={65}
          WidthBig={270}
          HeightIcon={40}
          WidthIcon={42}
          Choice={4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader1: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  HeaderContent: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.yellowDark,
    zIndex: 5,
  },
});

export default Dashboard;
