import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { StackActions } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import * as Print from "expo-print";

import Colors from "../../constants/Colors/Colors";
import React, { useState } from "react";
import { useInvoiceStore } from "../../Store/invoiceStore";
import InvoicePaymentPDF from "../../components/InvoicePayment/InvoicePaymentPDF";
import { httpUpsertInvoice } from "../../api/invoices.api";
import AmountInput from "../../components/UI/AmountInput";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";
import SuccessDialog from "../../components/UI/SuccessDialog";
import { useDepositStore } from "../../Store/depositStore";

function InvoicePayment({ navigation }) {
  const invoiceId = useInvoiceStore((state) => state.id);
  const status = useInvoiceStore((state) => state.status);
  const amountTotal = useInvoiceStore((state) => state.amountTotal);
  const amountPaid = useInvoiceStore((state) => state.amountPaid);
  const customerId = useInvoiceStore((state) => state.customerId);
  const carId = useInvoiceStore((state) => state.carId);
  const invoiceItems = useInvoiceStore((state) => state.invoiceItems);
  const depositIds = useInvoiceStore((state) => state.depositIds);
  const setInvoice = useInvoiceStore((state) => state.setInvoice);
  const toggleReloadInvoiceList = useInvoiceStore(
    (state) => state.toggleReloadInvoiceList
  );
  const setInvoiceId = useInvoiceStore((state) => state.setInvoiceId);
  const resetInvoice = useInvoiceStore((state) => state.resetInvoice);
  const resetSelectedDeposits = useDepositStore(
    (state) => state.resetSelectedDeposits
  );
  const firstName = useCustomerInfoStore((state) => state.firstName);
  const lastName = useCustomerInfoStore((state) => state.lastName);

  const [pdfHtmlContent, setPdfHtmlContent] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [isInvoiceEditable, setIsInvoiceEditable] = useState(status !== "Paid");
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  const pageTitle = !!invoiceId ? `#${invoiceId}` : "";

  async function handlePayment() {
    const amountDue = amountTotal - amountPaid - amountToPay;
    const status = amountDue === 0 ? "Paid" : "Pending";
    await saveInvoice(status);
  }

  async function saveInvoice(status) {
    const invoiceInfo = {
      status: status,
      amountTotal: +amountTotal,
      amountPaid: Number(amountPaid) + Number(amountToPay),
      amountDue: amountTotal - amountPaid - amountToPay,
      customerId: customerId,
      carId: carId,
      invoiceItems: invoiceItems,
      depositIds: depositIds,
    };

    if (!!invoiceId) invoiceInfo.id = invoiceId;

    const response = await httpUpsertInvoice(invoiceInfo);
    if (response.hasError) {
      return Alert.alert(
        "Error",
        "There was an error saving the invoice. Please try again later."
      );
    }

    // After Save refresh invoice list and return to main page
    setInvoiceId(response.data.id);
    setSuccessDialogVisible(true);
    setAmountToPay(0);
    setIsInvoiceEditable(status !== "Paid");
    toggleReloadInvoiceList();
    setInvoice(invoiceInfo);
  }

  async function handleDownload() {
    await Print.printAsync({ html: pdfHtmlContent });
  }

  async function handleShare() {
    const { uri } = await Print.printToFileAsync({ html: pdfHtmlContent });

    const newUri =
      FileSystem.documentDirectory + `Invoice-${firstName}-${lastName}.pdf`;
    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    if (!(await Sharing.isAvailableAsync())) {
      return Alert.alert("Error", "Sharing isn't available on your platform.");
    }

    await Sharing.shareAsync(newUri);
  }

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateToHome() {
    resetInvoice();
    resetSelectedDeposits();
    const pageGoHomeAction = StackActions.popToTop();
    navigation.dispatch(pageGoHomeAction);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content title={`Invoice Payment ${pageTitle}`}></Appbar.Content>
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={navigateToHome}
        />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.footerContainer}>
          <AmountInput
            value={amountToPay}
            onChange={setAmountToPay}
            isEditable={isInvoiceEditable}
            inputContainerStyles={styles.amountInput}
          />
          <Pressable
            disabled={!isInvoiceEditable || amountToPay === 0}
            onPress={handlePayment}
          >
            <View style={styles.paymentBtn}>
              <Text style={styles.paymentBtnText}>Payment</Text>
            </View>
          </Pressable>
        </View>

        {/* Buttons for Downloading and Sharing */}
        <View style={styles.buttonGroup}>
          <Pressable onPress={handleDownload}>
            <View style={styles.btn}>
              <Feather name="download" size={50} color="white" />
              <Text style={styles.btnText}>Download</Text>
            </View>
          </Pressable>
          <Pressable onPress={handleShare}>
            <View style={styles.btn}>
              <Entypo name="share" size={50} color="white" />
              <Text style={styles.btnText}>Share</Text>
            </View>
          </Pressable>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <InvoicePaymentPDF
            invoiceId={invoiceId}
            setPdfHtmlContent={setPdfHtmlContent}
          />
        </View>

        <SuccessDialog
          dialogVisible={successDialogVisible}
          setDialogVisible={setSuccessDialogVisible}
          headerText={"Invoice Payment has been received."}
          subHeaderText={
            "The payment has been applied to the invoice. If the amount was completely paid, the Invoice should transition to be completely paid. If not you can proceed to register payments for this invoice."
          }
        />
      </View>
    </View>
  );
}

export default InvoicePayment;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.lightGreenHeader,
  },
  container: {
    padding: 15,
  },
  buttonGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginLeft: 15,
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
    marginBottom: 15,
  },
  btnText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 8,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 45,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  amountInput: {
    width: 230,
  },
  paymentBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 230,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 15,
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
  },
  paymentBtnText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 8,
  },
});
