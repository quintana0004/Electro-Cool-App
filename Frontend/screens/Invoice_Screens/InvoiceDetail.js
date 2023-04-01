import { useMemo, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { MaskedText} from "react-native-mask-text";

import { httpGetInvoice } from "../../api/invoices.api";
import { useCustomerInfoStore, useVehicleInfoStore } from "../../Store/store";

import InvoiceDetailAddItem from "../../components/InvoiceDetail/InvoiceDetailAddItem";
import InvoiceDetailSelectDeposit from "../../components/InvoiceDetail/InvoiceDetailSelectDeposit";
import InvoiceDetailTableHeader from "../../components/InvoiceDetail/InvoiceDetailTableHeader";
import InvoiceDetailTableList from "../../components/InvoiceDetail/InvoiceDetailTableList";
import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";
import NavBtn from "../../components/UI/NavBtns";
import SaveMenu from "../../components/UI/SaveMenu";
import Colors from "../../constants/Colors/Colors";
import Figures from "../../constants/figures/Figures";

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
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedDeposits, setSelectedDeposits] = useState([]);

  const totalAmount = useMemo(() => {
    let amount = 0;

    for (let item of invoiceItems) {
      amount += item.unitPrice * item.quantity * 100;
    }

    return amount;
  }, [invoiceItems]);

  const { isLoading } = useQuery({
    queryKey: ["InvoiceDetailData", invoiceId],
    queryFn: fetchInvoiceData,
    enabled: !!invoiceId,
  });

  function getHeaderTitle() {
   return "Invoice" + (invoiceId && ` #${invoiceId}`);
  }

  function navigateNext() {}

  // TODO: Fix Navigations for new implementation
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

  function generateKey() {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `key-${randomString}`;
  }

  function onAddItem() {
    const newItem = {
      key: generateKey(),
      invoiceId: invoiceId,
      description: "",
      quantity: 0,
      unitPrice: 0,
      warranty: "N/A",
      totalPrice: 0,
    };
    invoiceItems.push(newItem);
    
    setInvoiceItems([...invoiceItems]);
    console.log("Add Invoice Items:", invoiceItems);
  }

  function setInvoiceInfo(data) {
    // Set Client and Car data
    setClientInfo(data.customer);
    setCarInfo(data.car);

    // Set a unique key for every invoice.
    const items = data.invoiceItems.map((item) => ({key: generateKey(), ...item}));
    setInvoiceItems(items);
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
        id: invoiceId,
        status: option,
        invoiceItems: invoiceItems,
        customerId: clientInfo.id,
        carId: carInfo.id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content title={getHeaderTitle()}></Appbar.Content>
      </Appbar.Header>
      <View style={styles.body}>
        {(isLoading && !!invoiceId) || (
          <View>
            <View style={{ height: 540 }}>
              <View style={styles.cardsContainer}>
                <View style={{ marginRight: 10 }}>
                  <ClientCard client={clientInfo} />
                </View>
                <CarCard car={carInfo} />
              </View>
              <View style={styles.buttonGroup}>
                <InvoiceDetailAddItem onPress={onAddItem}/>
                <InvoiceDetailSelectDeposit invoiceId={invoiceId} amount={2} setSelectedDeposits={setSelectedDeposits} />
              </View>
              <InvoiceDetailTableHeader />
              <InvoiceDetailTableList invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} />
            </View>
            <View style={styles.invoiceSummary}>
              <ImageBackground source={Figures.InvoiceSummaryImage} style={styles.imageBackgroundContainer}>
                <View>
                  <Text style={[ styles.amountsText, styles.totalAmountText ]}>
                    Total:{' '} 
                    <MaskedText
                      type="currency"
                      options={{
                        prefix: "$",
                        decimalSeparator: ".",
                        groupSeparator: ",",
                        precision: 2,
                      }}
                    > 
                      {totalAmount}
                    </MaskedText>
                  </Text>
                  <Text style={styles.amountsText}>Amount Paid: $200.36</Text>
                  <Text style={styles.amountsText}>Amount Due: $304.36</Text>
                </View>
              </ImageBackground>
            </View>
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
    marginTop: 30,
    height: 690,
    zIndex: -1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.yellowDark
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
  invoiceSummary: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  imageBackgroundContainer: {
    height: 150,
    width: 500,
    resizeMode: 'contain',
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  totalAmountText: {
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(40, 160, 103, 0.4);',
  },
  amountsText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
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
