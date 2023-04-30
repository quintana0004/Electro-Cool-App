import { useMemo, useState } from "react";
import { ToastAndroid, Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { MaskedText} from "react-native-mask-text";

import { httpGetInvoice, httpUpsertInvoice } from "../../api/invoices.api";

import InvoiceDetailAddItem from "../../components/InvoiceDetail/InvoiceDetailAddItem";
import InvoiceDetailSelectDeposit from "../../components/InvoiceDetail/InvoiceDetailSelectDeposit";
import InvoiceDetailTableHeader from "../../components/InvoiceDetail/InvoiceDetailTableHeader";
import InvoiceDetailTableList from "../../components/InvoiceDetail/InvoiceDetailTableList";
import PaymentConfirmationDialog from "../../components/UI/PaymentConfirmationDialog";
import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";
import NavBtn from "../../components/UI/NavBtns";
import SaveMenu from "../../components/UI/SaveMenu";
import Colors from "../../constants/Colors/Colors";
import {
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";

import Figures from "../../constants/figures/Figures";
import { useDepositStore } from "../../Store/depositStore";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { StackActions } from "@react-navigation/native";

function InvoiceDetail({ route, navigation }) {
  const { invoiceId = null } = route.params || {};

  // --- Store Variables
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
  const setInvoice = useInvoiceStore((state) => state.setInvoice);
  const toggleReloadInvoiceList = useInvoiceStore((state) => state.toggleReloadInvoiceList);
  const clientSelectedDeposits = useDepositStore((state) => state.clientSelectedDeposits);
  const serverSelectedDeposits = useDepositStore((state) => state.serverSelectedDeposits);
  const resetSelectedDeposits = useDepositStore((state) => state.resetSelectedDeposits);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  // --- State Variables
  const [clientInfo, setClientInfo] = useState(client);
  const [carInfo, setCarInfo] = useState(car);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceStatus, setInvoiceStatus] = useState("");

  // --- Calculated Variables
  const totalAmount = useMemo(() => {
    let amount = 0;

    for (let item of invoiceItems) {
      amount += item.unitPrice * item.quantity;
    }

    return amount * 100;
  }, [invoiceItems]);

  const amountPaid = useMemo(() => {
    let amount = 0;

    for (let deposit of clientSelectedDeposits) {
      amount += Number(deposit.amountTotal);
    }

    for (let deposit of serverSelectedDeposits) {
      amount += Number(deposit.amountTotal);
    }

    return amount * 100;
  }, [clientSelectedDeposits, serverSelectedDeposits]);

  const amountDue = useMemo(() => {
    return totalAmount - amountPaid;
  }, [totalAmount, amountPaid]);


  // --- Data Fetching
  const { isLoading, isError, error } = useQuery({
    queryKey: ["InvoiceDetailData", invoiceId],
    queryFn: fetchInvoiceData,
    enabled: !!invoiceId,
  });

  function getHeaderTitle() {
   return "Invoice" + (invoiceId ? ` #${invoiceId}` : "");
  }

  function navigateToPayment() {
    const pageAction = StackActions.push("InvoicePayment");
    navigation.dispatch(pageAction);
  }

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateCancel() {
    resetSelectedDeposits();
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
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
  }

  function setInvoiceInfo(data) {
    // Set Client and Car data
    setClientInfo(data.customer);
    setCarInfo(data.car);

    // Set a unique key for every invoice.
    const items = data.invoiceItems.map((item) => ({key: generateKey(), ...item}));
    setInvoiceItems(items);
  }

  function getDepositIds() {
    let depositIds = [];

    for (let deposit of clientSelectedDeposits) {
      depositIds.push(deposit.id);
    }

    for (let deposit of serverSelectedDeposits) {
      depositIds.push(deposit.id);
    }

    return depositIds;
  }

  async function fetchInvoiceData() {
    const data = await httpGetInvoice(invoiceId);
    setInvoiceInfo(data.data);
    return data.data;
  }

  async function onSaveUpdateInvoice(option) {

    setInvoiceStatus(option);

    // Request user confirmation for payment
    if (option === "Paid") {
      return setIsDialogVisible(true);
    }
    
    // Save Deposit if payment was not selected
    await saveInvoice(option);

    // After Save refresh invoice list and return to main page
    toggleReloadInvoiceList();
    showSuccessMessage();

    return navigation.navigate("InvoiceMain");
  }

  async function saveInvoice(status) {
    const invoiceInfo = {
      status: status,
      amountTotal: totalAmount / 100,
      amountPaid: amountPaid / 100,
      amountDue: amountDue / 100,
      customerId: clientInfo.id,
      carId: carInfo.id,
      invoiceItems: invoiceItems,
      depositIds: getDepositIds(),
    };

    // Only Add Id if present
    if (invoiceId) invoiceInfo.id = invoiceId;

    const response = await httpUpsertInvoice(invoiceInfo);
    if (response.hasError) {
      console.log("Error message on upsert invoice: ", response.errorMessage);
      return Alert.alert("Error", "There was an error saving the invoice. Please try again later.");
    }

    // Store Invoice Information In the Store
    setInvoice(invoiceInfo);
  }

  async function handleInvoicePayment() {

    await saveInvoice(invoiceStatus);

    // Refresh Invoice List and Navigate to Payment
    toggleReloadInvoiceList();
    showSuccessMessage();
    setIsDialogVisible(false);

    return navigateToPayment();
  }

  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
  }

  if (isError) {
    console.log("Error Fetching Invoice Detail: ", error);
    Alert.alert("Error", "There was an error fetching the invoice detail data. Please try again later.");
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
                <InvoiceDetailSelectDeposit invoiceId={invoiceId} />
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
                  <Text style={styles.amountsText}>Amount 
                    Paid: {' '}
                    <MaskedText
                      type="currency"
                      options={{
                        prefix: "$",
                        decimalSeparator: ".",
                        groupSeparator: ",",
                        precision: 2,
                      }}
                    > 
                      {amountPaid}
                    </MaskedText>
                  </Text>
                  <Text style={styles.amountsText}>
                    Amount Due: {' '}
                    <MaskedText
                      type="currency"
                      options={{
                        prefix: "$",
                        decimalSeparator: ".",
                        groupSeparator: ",",
                        precision: 2,
                      }}
                    > 
                      {amountDue}
                    </MaskedText>
                  </Text>
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

      {/* Dialogs */}
      {isDialogVisible && (
        <PaymentConfirmationDialog 
          title={"Realize Invoice Payment"}
          body={"Once a payment is made, this invoice cannot be modified again."}
          isDialogVisible={isDialogVisible} 
          setIsDialogVisible={setIsDialogVisible} 
          onCancel={() => setIsDialogVisible(false)}
          onConfirm={handleInvoicePayment}
        />
      )}

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
