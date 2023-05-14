import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { StackActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import * as Print from "expo-print";

import Colors from "../../constants/Colors/Colors";
import { useDepositStore } from "../../Store/depositStore";
import PaymentInput from "../../components/UI/PaymentInput";
import DepositPaymentPDF from "../../components/DepositPayment/DepositPaymentPDF";
import React, { useState } from "react";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";

function DepositPayment({ navigation }) {
  const depositId = useDepositStore((state) => state.id);
  const amount = useDepositStore((state) => state.amount);
  const firstName = useCustomerInfoStore((state) => state.firstName);
  const lastName = useCustomerInfoStore((state) => state.lastName);

  const [pdfHtmlContent, setPdfHtmlContent] = useState("");

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateToHome() {
    const pageGoHomeAction = StackActions.popToTop();
    navigation.dispatch(pageGoHomeAction);
  }

  async function handleShare() {
    const { uri } = await Print.printToFileAsync({ html: pdfHtmlContent });

    const newUri =
      FileSystem.documentDirectory + `Deposit-${firstName}-${lastName}.pdf`;
    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    if (!(await Sharing.isAvailableAsync())) {
      return Alert.alert("Error", "Sharing isn't available on your platform.");
    }

    await Sharing.shareAsync(newUri);
  }

  async function handleDownload() {
    await Print.printAsync({ html: pdfHtmlContent });
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content
          title={`Deposit Payment #${depositId}`}
        ></Appbar.Content>
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={navigateToHome}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {/* Footer Container */}
        <View style={styles.footerContainer}>
          <PaymentInput value={amount} />

          <View style={styles.paymentBtn}>
            <Text style={styles.paymentBtnText}>Total Paid</Text>
          </View>
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
          <DepositPaymentPDF
            depositId={depositId}
            setPdfHtmlContent={setPdfHtmlContent}
          />
        </View>
      </View>
    </View>
  );
}

export default DepositPayment;

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
    paddingHorizontal: 20,
    marginTop: 20,
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
