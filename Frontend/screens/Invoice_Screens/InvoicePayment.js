import { Pressable, StyleSheet, Text, View } from "react-native";
import { StackActions } from "@react-navigation/native";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import * as Print from "expo-print";

import Colors from "../../constants/Colors/Colors";
import PaymentInput from "../../components/UI/PaymentInput";
import { useState } from "react";
import { useInvoiceStore } from "../../Store/invoiceStore";
import InvoicePaymentPDF from "../../components/InvoicePayment/InvoicePaymentPDF";

function InvoicePayment({ navigation }) {
  const invoiceId = useInvoiceStore((state) => state.id);
  const [pdfHtmlContent, setPdfHtmlContent] = useState("");

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateToHome() {
    const pageGoHomeAction = StackActions.popToTop();
    navigation.dispatch(pageGoHomeAction);
  }

  function handleShare() {
    console.log("Handle Share");
  }

  function handleQRCode() {
    console.log("Handle QR Code");
  }

  function handlePayment() {
    console.log("Handle Payment");
  }

  async function handleDownload() {
    await Print.printAsync({ html: pdfHtmlContent });
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content
          title={`Invoice Payment #${invoiceId}`}
        ></Appbar.Content>
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={navigateToHome}
        />
      </Appbar.Header>
      <View style={styles.container}>
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
          <Pressable onPress={handleQRCode}>
            <View style={styles.btn}>
              <MaterialCommunityIcons name="qrcode" size={50} color="white" />
              <Text style={styles.btnText}>QR Code</Text>
            </View>
          </Pressable>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <InvoicePaymentPDF
            depositId={invoiceId}
            setPdfHtmlContent={setPdfHtmlContent}
          />
        </View>

        {/* Footer Container */}
        <View style={styles.footerContainer}>
          <PaymentInput value={120.64} />

          <Pressable onPress={handlePayment}>
            <View style={styles.paymentBtn}>
              <Text style={styles.paymentBtnText}>Full Payment</Text>
            </View>
          </Pressable>
        </View>
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
    marginTop: 50,
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
    paddingHorizontal: 20,
    marginTop: 40,
  },
  paymentBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
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
