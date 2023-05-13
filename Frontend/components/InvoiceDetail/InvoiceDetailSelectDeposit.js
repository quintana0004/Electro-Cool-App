import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { useQuery } from "@tanstack/react-query";
import { httpGetDepositsByInvoiceId } from "../../api/deposits.api";
import { useEffect, useState } from "react";
import InvoiceDetailModal from "./InvoiceDetailModal";
import { useDepositStore } from "../../Store/depositStore";

function InvoiceDetailSelectDeposit({ isInvoiceEditable, invoiceId }) {
  const [depositsCount, setDepositsCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const clientSelectedDeposits = useDepositStore(
    (state) => state.clientSelectedDeposits
  );
  const serverSelectedDeposits = useDepositStore(
    (state) => state.serverSelectedDeposits
  );
  const setServerSelectedDeposits = useDepositStore(
    (state) => state.setServerSelectedDeposits
  );

  const { isError, error } = useQuery({
    queryKey: ["SelectedDeposits", invoiceId],
    queryFn: fetchDepositsData,
    enabled: !!invoiceId,
  });

  useEffect(() => {
    calculateSelectedDepositsCount();
  }, [clientSelectedDeposits, serverSelectedDeposits]);

  async function fetchDepositsData() {
    const response = await httpGetDepositsByInvoiceId(invoiceId);
    setServerSelectedDeposits(response.data);
    return response.data;
  }

  function calculateSelectedDepositsCount() {
    const count = clientSelectedDeposits.length + serverSelectedDeposits.length;
    setDepositsCount(count);
  }

  function showDepositModal() {
    setVisible(true);
  }

  if (isError) {
    Alert.alert(
      "Error",
      "There was an error fetching the deposits for this invoice. Please reload app."
    );
  }

  return (
    <View>
      <Pressable onPress={showDepositModal} disabled={!isInvoiceEditable}>
        <View style={styles.container}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{depositsCount}</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Select Deposit</Text>
          </View>
        </View>
      </Pressable>
      <InvoiceDetailModal visible={visible} setVisibile={setVisible} />
    </View>
  );
}

export default InvoiceDetailSelectDeposit;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 260,
    height: 50,
    padding: 10,
    backgroundColor: Colors.selectGreen,
    borderRadius: 15,
  },
  countContainer: {
    width: 35,
    height: 35,
    borderRadius: 15,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
