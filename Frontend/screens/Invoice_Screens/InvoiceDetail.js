import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { httpGetInvoice } from "../../api/invoices.api";
import InvoiceDetailAddItem from "../../components/InvoiceDetail/InvoiceDetailAddItem";
import InvoiceDetailSelectDeposit from "../../components/InvoiceDetail/InvoiceDetailSelectDeposit";
import InvoiceDetailTableHeader from "../../components/InvoiceDetail/InvoiceDetailTableHeader";
import InvoiceDetailTableItem from "../../components/InvoiceDetail/InvoiceDetailTableItem";
import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";
import Header from "../../components/UI/Header";
import NavBtn from "../../components/UI/NavBtns";
import SaveMenu from "../../components/UI/SaveMenu";
import Colors from "../../constants/Colors/Colors";
import { useCustomerInfoStore, useVehicleInfoStore } from "../../Store/store";

// TODO:
// 1. Create a Add Item Component
// 2. Creat a Select Deposit Component
// 3. Create a Invoice Detail Table Header Component
// 4. Create a Invoice Detail Table List Component
// 5. Create a Invoice Detail Table Item Component
// 6. Create a Invoice Detail Sumamry Component

function InvoiceDetail({ route, navigation }) {
  const { invoiceId = null } = route.params || {};
  const client = useCustomerInfoStore((state) => {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      addressLine1: state.addressLine1,
      addressLine2: state.addressLine2,
      state: state.state,
      city: state.city,
      phone: state.phone,
      email: state.email,
    };
  });
  const car = useVehicleInfoStore((state) => {
    return {
      id: state.id,
      brand: state.brand,
      licensePlate: state.licensePlate,
      model: state.model,
      year: state.year,
      mileage: state.mileage,
      color: state.color,
      vinNumber: state.vinNumber,
      carHasItems: state.carHasItems,
      carItemsDescription: state.carItemsDescription,
      customerId: state.customerId,
    };
  });
  const [clientInfo, setClientInfo] = useState(client);
  const [carInfo, setCarInfo] = useState(car);

  const { isLoading, data, hasError } = useQuery({
    queryKey: ["InvoiceDetailData", invoiceId],
    queryFn: fetchInvoiceData,
    enabled: !!invoiceId,
  });

  function navigateNext() {}

  function navigateBack() {
    navigation.navigate("ExistingCars", {
      nextScreen: "InvoiceDetail",
      previousScreen: "ExistingClients",
      cancelScreen: "InvoiceMain",
      client: client,
    });
  }

  function navigateCancel() {
    navigation.navigate("InvoiceMain");
  }

  function setInvoiceInfo(data) {
    setClientInfo(data.customer);
    setCarInfo(data.car);
  }

  async function fetchInvoiceData() {
    try {
      const data = await httpGetInvoice(invoiceId);
      setInvoiceInfo(data.data);
      return data.data;
    } catch (error) {
      // This is temporary until I can figure out how to handle errors
      Alert.alert("Error", "There was an error fetching the invoice data.");
    }
  }

  async function onSaveUpdateInvoice(option) {
    try {
      const invoiceInfo = {
        customer: clientInfo.id,
        car: carInfo.id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Header divideH={7} divideW={1} colorHeader={Colors.yellowDark} headerStyles={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Invoice {invoiceId && `#${invoiceId}`}</Text>
        </View>
      </Header>
      <View style={styles.body}>
        {(isLoading && !!invoiceId) || (
          <View style={{ height: 600 }}>
            <View style={styles.cardsContainer}>
              <View style={{ marginRight: 10 }}>
                <ClientCard client={clientInfo} />
              </View>
              <CarCard car={carInfo} />
            </View>
            <View style={styles.buttonGroup}>
              <InvoiceDetailAddItem />
              <InvoiceDetailSelectDeposit amount={2} />
            </View>
            <InvoiceDetailTableHeader />
            <InvoiceDetailTableItem description={"Botellas Pruebas"} price={23} quantity={2} />
            <InvoiceDetailTableItem description={"Botellas Pruebas"} price={23} quantity={2} />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.navBtnGroup}>
          <View style={styles.navBackBtn}>
            <NavBtn choice={"Back"} nav={navigateBack} />
          </View>
          <View style={styles.navCancelBtn}>
            <NavBtn choice={"Cancel"} nav={navigateCancel} />
          </View>
          <SaveMenu onSelection={onSaveUpdateInvoice} />
        </View>
      </View>
    </View>
  );
}

export default InvoiceDetail;

const styles = StyleSheet.create({
  body: {
    marginTop: 180,
    height: 600,
    zIndex: -1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  navBtnGroup: {
    width: 540,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navBackBtn: {
    marginRight: 130,
  },
  navCancelBtn: {
    marginRight: 10,
  },
  navNextBtn: {
    marginLeft: 10,
  },
});
