import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../../constants/colors";
import { StyleSheet, View } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

//Screens
import {
  JobOrderStack,
  InvoiceStack,
  ClientBookStack,
} from "../navigation/stack";

import Home from "../../screens/Home";
import Calendar from "../../screens/Calendar";
import Setting from "../../screens/Setting";
import LogIn from "../../screens/LogIn";

const Drawer = createDrawerNavigator();

function MenuDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "permanent",
        drawerStyle: {
          width: 115,
          backgroundColor: Colors.blackGreyDark,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
          marginTop: 30,
          marginBottom: 30,
          position: "absolute",
          right: 0,
        },
        drawerActiveTintColor: Colors.hueGrey,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 15,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon1}>
              <Ionicons name="home-sharp" size={45} color={Colors.yellow} />
            </View>
          ),
          drawerLabel: "",
        }}
      />
      <Drawer.Screen
        name="JobOrder"
        component={JobOrderStack}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 10,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon2}>
              <FontAwesome5
                name="clipboard-list"
                size={45}
                color={Colors.yellow}
              />
            </View>
          ),
          drawerLabel: "",
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 10,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon1}>
              <Ionicons
                name="ios-calendar-sharp"
                size={45}
                color={Colors.yellow}
              />
            </View>
          ),
          drawerLabel: "",
        }}
      />
      <Drawer.Screen
        name="Invoices"
        component={InvoiceStack}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 10,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon2}>
              <FontAwesome5
                name="file-invoice"
                size={45}
                color={Colors.yellow}
              />
            </View>
          ),
          drawerLabel: "",
        }}
      />
      <Drawer.Screen
        name="Client Book"
        component={ClientBookStack}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 10,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon1}>
              <FontAwesome name="book" size={45} color={Colors.yellow} />
            </View>
          ),
          drawerLabel: "",
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 10,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon1}>
              <Feather name="settings" size={45} color={Colors.yellow} />
            </View>
          ),
          drawerLabel: "",
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogIn}
        options={{
          headerShown: false,
          drawerItemStyle: {
            width: 90,
            height: 90,
            borderRadius: 20,
            marginTop: 10,
            marginRight: 15,
            marginBottom: 10,
          },
          drawerIcon: () => (
            <View style={styles.icon1}>
              <MaterialIcons name="logout" size={45} color={Colors.yellow} />
            </View>
          ),
          drawerLabel: "",
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon1: {
    padding: 15,
  },
  icon2: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 20,
  },
});

export default MenuDrawer;
