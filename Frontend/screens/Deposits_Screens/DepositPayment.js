import { View, Text, StyleSheet, Pressable } from "react-native";
import { StackActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";

import Colors from "../../constants/Colors/Colors";
import { useDepositStore } from "../../Store/depositStore";
import PaymentInput from "../../components/UI/PaymentInput";
import DepositPaymentPDF from "../../components/DepositPayment/DepositPaymentPDF";

// TODO:
// * Need to research how to utilize the pdf library from the React Native package
// * Need to develop ability to download generated pdf to device.
// * Need to develop how to preview the pdf on the deposit screen.
// * Need to develop hwo to use the share bottom with react native to send a pdf.
// * Need to see how to generate a unique QR Code to share the pdf through scan. - (NOT TOP PRIORITY LIKE THE OTHER 2)

function DepositPayment({ navigation }) {
  const depositId = useDepositStore((state) => state.id);

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateToHome() {
    const pageGoHomeAction = StackActions.popToTop();
    navigation.dispatch(pageGoHomeAction);
  }

  function handleDownload() {
    console.log("Handle Download");
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
        {/* Buttons for Downloading and Sharing */}
        <View style={styles.buttonGroup}>
          <Pressable onPress={handleDownload}>
            <View style={styles.btn}>
              <Feather name="download" size={28} color="white" />
              <Text style={styles.btnText}>Download</Text>
            </View>
          </Pressable>
          <Pressable onPress={handleShare}>
            <View style={styles.btn}>
              <Entypo name="share" size={28} color="white" />
              <Text style={styles.btnText}>Share</Text>
            </View>
          </Pressable>
          <Pressable onPress={handleQRCode}>
            <View style={styles.btn}>
              <MaterialCommunityIcons name="qrcode" size={28} color="white" />
              <Text style={styles.btnText}>QR Code</Text>
            </View>
          </Pressable>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <DepositPaymentPDF depositId={depositId} />
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

export default DepositPayment;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.lightGreenHeader,
  },
  container: {
    padding: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 15,
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
  },
  btnText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 20,
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
