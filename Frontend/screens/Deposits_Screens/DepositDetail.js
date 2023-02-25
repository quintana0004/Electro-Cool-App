import { StyleSheet, Text, View } from "react-native";
import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";

import Header from "../../components/UI/Header";
import NavBtn from "../../components/UI/NavBtns";
import Colors from "../../constants/Colors/Colors";

function DepositDetail({ route, navigation }) {
  const { client, car } = route.params;

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
      <Header divideH={6} divideW={1} colorHeader={Colors.darkGreen} headerStyles={styles.header}>
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
  cardsContainer: {
    marginTop: 10,
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
