import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors/Colors";
import MenuBtnNav from "./MenuBtnNav";
import { useRouterStore } from "../../Store/routerStore";
import { CBCustomerInfoStore } from "../../Store/JobOrderStore";
import { httpLogOut } from "../../api/auth.api";
import ErrorDialog from "./ErrorDialog";
import { storeTokens } from "../../Store/secureStore";

function MenuDropDown() {
  //Navigate to the corresponding pages
  const navigation = useNavigation();

  //Reloads the client book list
  const setReloadClientBookList = CBCustomerInfoStore(
    (state) => state.setReloadClientBookList
  );

  // Store For Management of Routers
  const setExistingClientNextPage = useRouterStore(
    (state) => state.setExistingClientNextPage
  );
  const setExistingCarNextPage = useRouterStore(
    (state) => state.setExistingCarNextPage
  );
  const setNewCarNextPage = useRouterStore((state) => state.setNewCarNextPage);
  const setRequestedServiceNextPage = useRouterStore(
    (state) => state.setRequestedServiceNextPage
  );

  const [visible, setVisible] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  //Set the toggle btn when closed or open
  const [toggle, setToggleBtn] = useState(false);

  //Create the variable to hold the icon
  let iconChoice = (
    <MaterialCommunityIcons
      name="window-close"
      size={20}
      color={Colors.yellowDark}
    />
  );

  //Verify the toggle to change the icon
  if (toggle === true) {
    iconChoice = (
      <MaterialCommunityIcons
        name="window-close"
        size={20}
        color={Colors.yellowDark}
      />
    );
  } else if (toggle === false) {
    iconChoice = (
      <SimpleLineIcons name="menu" size={20} color={Colors.yellowDark} />
    );
  }

  function navDashboard() {
    navigation.navigate("Dashboard");
    setToggleBtn(false);
  }

  function navJobOrder() {
    setExistingClientNextPage("CarSelection");
    setExistingCarNextPage("RequestedService");
    setNewCarNextPage("RequestedService");
    setRequestedServiceNextPage("CompanyPolicy");
    navigation.navigate("JobOrders");

    setToggleBtn(false);
  }

  function navInvoices() {
    setExistingClientNextPage("ExistingCars");
    setExistingCarNextPage("InvoiceDetail");
    navigation.navigate("Invoices");
    setToggleBtn(false);
  }

  function navClientBook() {
    setReloadClientBookList();
    navigation.navigate("ClientBook");
    setToggleBtn(false);
  }

  function navCalendar() {
    setExistingClientNextPage("CarSelection");
    setExistingCarNextPage("RequestedService");
    setNewCarNextPage("RequestedService");
    setRequestedServiceNextPage("CreateAppointments");

    navigation.navigate("Calendar");
    setToggleBtn(false);
  }

  function navSettings() {
    navigation.navigate("Settings");
    setToggleBtn(false);
  }

  async function navLogOut() {
    const response = await httpLogOut();
    await storeTokens("", "");

    if (response.hasError) {
      setVisible(true);
      setErrorMSG(response.errorMessage);
    }

    navigation.navigate("LogIn");
  }

  return (
    <Pressable
      onPress={() => {
        setToggleBtn(!toggle);
      }}
    >
      <View style={styles.circle}>{iconChoice}</View>
      {toggle && (
        <View style={styles.boxOption}>
          <MenuBtnNav choice={"Dashboard"} nav={navDashboard} />
          <MenuBtnNav choice={"Job Orders"} nav={navJobOrder} />
          <MenuBtnNav choice={"Invoices"} nav={navInvoices} />
          <MenuBtnNav choice={"Client Book"} nav={navClientBook} />
          <MenuBtnNav choice={"Calendar"} nav={navCalendar} />
          <MenuBtnNav choice={"Settings"} nav={navSettings} />
          <MenuBtnNav choice={"Log Out"} nav={navLogOut} />
        </View>
      )}
      <ErrorDialog
        dialogVisible={visible}
        setDialogVisible={setVisible}
        errorMSG={errorMSG}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginLeft: 10,
  },
  boxOption: {
    position: "absolute",
    top: 50,
    zIndex: 1,
  },
});

export default MenuDropDown;
