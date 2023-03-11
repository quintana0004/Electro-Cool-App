import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Colors from "../../constants/Colors/Colors";

import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";
import Header from "../../components/UI/Header";
import NavBtn from "../../components/UI/NavBtns";
import SectionDivider from "../../components/UI/SectionDivider";
import AmountInput from "../../components/UI/AmountInput";
import SaveMenu from "../../components/UI/SaveMenu";
import { httpGetDeposit, httpUpsertDeposit } from "../../api/deposits.api";
import { useQuery } from "@tanstack/react-query";

function DepositDetail({ route, navigation }) {
  const { client, car, depositId } = route.params;
  const [clientInfo, setClientInfo] = useState(client);
  const [carInfo, setCarInfo] = useState(car);
  const [depositDescription, setDepositDescription] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  const { isLoading, data, hasError } = useQuery({
    queryKey: ["DepositDetailData", depositId],
    queryFn: fetchDepositData,
    enabled: !!depositId,
  });

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

  function setDepositInfo(data) {
    setClientInfo(data.customer);
    setCarInfo(data.car);
    setDepositDescription(data.description);
    setDepositAmount(data.amountTotal);
  }

  async function fetchDepositData() {
    const data = await httpGetDeposit(depositId);
    setDepositInfo(data.data);
    return data.data;
  }

  async function onSaveUpdateDeposit(option) {
    try {
      const depositInfo = {
        customerId: clientInfo.id,
        carId: carInfo.id,
        description: depositDescription,
        amountTotal: depositAmount,
        status: getDepositOption(option),
      };

      // Only assign the depositId if it exists. If it doesn't exist, then we are creating a new deposit.
      if (depositId) depositInfo.id = depositId;

      await httpUpsertDeposit(depositInfo);
      Alert.alert("Success", "The deposit was saved successfully.");
      onSaveNavigation(option);
    } catch (error) {
      // This is temporary until we define how we want to handle errors.
      Alert.alert("Error", "There was an error saving the deposit.");
    }
  }

  function onSaveNavigation(option) {
    if (option === "Done") {
      navigation.navigate("InvoiceMain");
    } else if (option === "In Draft") {
      navigation.navigate("InvoiceMain");
    } else if (option === "Pay") {
      // TODO: Navigate to the page where we generate the PDF for the Deposit.
      console.log("Pay Button Clicked");
    }
  }

  // This is temporary until we figure out how to handle the status of the deposit.
  function getDepositOption(option) {
    if (option === "Done") {
      return "Pending";
    } else {
      return option;
    }
  }

  return (
    <View>
      <Header divideH={7} divideW={1} colorHeader={Colors.darkGreen} headerStyles={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Deposit</Text>
        </View>
      </Header>
      <View style={styles.body}>
        {(isLoading && !!depositId) || (
          <View style={{ height: 600 }}>
            <View style={styles.cardsContainer}>
              <View style={{ marginRight: 10 }}>
                <ClientCard client={clientInfo} />
              </View>
              <CarCard car={carInfo} />
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
              onChangeText={setDepositDescription}
            />

            <SectionDivider title={"Deposit Amount"} />

            <AmountInput value={depositAmount} onChange={setDepositAmount} />
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
          <SaveMenu onSelection={onSaveUpdateDeposit} />
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
