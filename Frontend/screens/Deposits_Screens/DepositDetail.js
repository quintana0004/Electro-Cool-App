import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Colors from "../../constants/Colors/Colors";

import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";
import Header from "../../components/UI/Header";
import NavBtn from "../../components/UI/NavBtns";
import SectionDivider from "../../components/UI/SectionDivider";
import AmountInput from "../../components/UI/AmountInput";

function DepositDetail({ route, navigation }) {
  const { client, car } = route.params;
  const [depositDescription, setDepositDescription] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  function navigateNext() {}

  function navigateBack() {
    navigation.navigate("ExistingCars", {
      nextScreen: "DepositDetail",
      previousScreen: "ExistingClients",
      cancelScreen: "InvoiceMain",
      client: client,
    });
  }

  function navigateCancel() {
    navigation.navigate("InvoiceMain");
  }

  return (
    <View>
      <Header divideH={7} divideW={1} colorHeader={Colors.darkGreen} headerStyles={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Deposit</Text>
        </View>
      </Header>
      <View style={styles.body}>
        <View style={styles.cardsContainer}>
          <View style={{ marginRight: 10 }}>
            <ClientCard client={client} />
          </View>
          <CarCard car={car} />
        </View>

        <SectionDivider
          containerStyles={{ justifyContent: "center" }}
          title={"Deposit Description"}
        />

        <TextInput
          style={styles.textInput}
          value={depositDescription}
          mode="outlined"
          multiline
          numberOfLines={8}
          onChange={setDepositDescription}
        />

        <SectionDivider title={"Deposit Amount"} />

        <AmountInput onChange={setDepositAmount} />
      </View>
      <View style={styles.footer}>
        <View style={styles.navBtnGroup}>
          <View style={styles.navBackBtn}>
            <NavBtn choice={"Back"} nav={navigateBack} />
          </View>
          <View style={styles.navCancelBtn}>
            <NavBtn choice={"Cancel"} nav={navigateCancel} />
          </View>
          <View style={styles.navNextBtn}>
            <NavBtn choice={"Save"} nav={navigateNext} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default DepositDetail;

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
  textInput: {
    textAlignVertical: "top",
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
