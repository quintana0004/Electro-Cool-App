import { useState } from "react";
import { Button, Card, Modal, Portal } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { httpGetInvoice } from "../../api/invoices.api";
import ClientCard from "../UI/ClientCard";
import CarCard from "../UI/CarCard";
import DashboardInvoiceItemList from "./DashboardInvoiceItemList";
import { MaskedText } from "react-native-mask-text";

function DashboardInvoiceItemModal({
  invoiceId,
  modalVisible,
  setModalVisible,
}) {
  const [formattedTotalAmount, setFormattedTotalAmount] = useState(0);
  const [clientInfo, setClientInfo] = useState(null);
  const [carInfo, setCarInfo] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const hideModal = () => setModalVisible(false);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["DashboardInvoiceItemsData", invoiceId],
    queryFn: fetchInvoiceData,
    enabled: !!invoiceId,
  });

  async function fetchInvoiceData() {
    const response = await httpGetInvoice(invoiceId);
    setInvoiceInfo(response.data);
    return response.data;
  }

  function setInvoiceInfo(data) {
    const totalAmount = data.amountTotal * 100;
    setFormattedTotalAmount(totalAmount);
    setClientInfo(data.customer);
    setCarInfo(data.car);
    setInvoiceItems(data.invoiceItems);
  }

  return (
    <Portal>
      <Modal
        visible={!isLoading && modalVisible}
        animationType="fade"
        onDismiss={hideModal}
      >
        <Card style={[styles.modalContainer]}>
          <View style={styles.headerContainer}>
            <Card.Actions style={{ alignSelf: "center" }}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Invoice #{invoiceId}</Text>
              </View>
            </Card.Actions>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ClientCard client={clientInfo} />
            <View style={{ marginLeft: 10 }}>
              <CarCard car={carInfo} />
            </View>
          </View>

          <DashboardInvoiceItemList invoiceItems={invoiceItems} />

          <View>
            <Card.Actions style={{ alignSelf: "center" }}>
              <View style={styles.totalAmountContainer}>
                <Text style={{ fontSize: 18 }}>Total: </Text>
                <MaskedText
                  type="currency"
                  options={{
                    prefix: "$",
                    decimalSeparator: ".",
                    groupSeparator: ",",
                    precision: 2,
                  }}
                  style={{ fontSize: 18 }}
                >
                  {formattedTotalAmount}
                </MaskedText>
              </View>
            </Card.Actions>
            <Card.Actions>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                buttonColor="#C4E2E2"
                textColor="#138A8C"
                borderColor="#138A8C"
                mode="contained"
                style={[{ borderRadius: 10 }]}
              >
                Cancel
              </Button>
              <Button
                title="Confirmation"
                onPress={() => setModalVisible(false)}
                buttonColor="#138A8C"
                style={[{ borderRadius: 10 }]}
              >
                Confirmation
              </Button>
            </Card.Actions>
          </View>
        </Card>
      </Modal>
    </Portal>
  );
}

export default DashboardInvoiceItemModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    paddingHorizontal: 20,
    width: 550,
    height: 600,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTextContainer: {
    backgroundColor: "#E5B126",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  totalAmountContainer: {
    backgroundColor: "#A9D9C2",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
