import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { useQuery } from "@tanstack/react-query";
import { httpGetDepositsByInvoiceId } from "../../api/deposits.api";
import { useEffect, useState } from "react";
import InvoiceDetailModal from "./InvoiceDetailModal";
import { useDepositStore } from "../../Store/depositStore";

function InvoiceDetailSelectDeposit({ invoiceId, onPress }) {
  const [depositsCount, setDepositsCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const clientSelectedDeposits = useDepositStore((state) => state.clientSelectedDeposits);
  const serverSelectedDeposits = useDepositStore((state) => state.serverSelectedDeposits);
  const setServerSelectedDeposits = useDepositStore((state) => state.setServerSelectedDeposits);

  const { isLoading, data } = useQuery({
    queryKey: ["SelectedDeposits", invoiceId],
    queryFn: fetchDepositsData,
    enabled: !!invoiceId,
  });

  useEffect(() => {
    calculateSelectedDepositsCount();
  }, [clientSelectedDeposits, serverSelectedDeposits]);

  async function fetchDepositsData() {
    try {
      const response = await httpGetDepositsByInvoiceId(invoiceId);
      setServerSelectedDeposits(response.data);
      return response.data;
    }
    catch (error) {
      console.log("Select Deposit Fetch Error: ", error);
    }
  }

  function calculateSelectedDepositsCount() {
    const count = clientSelectedDeposits.length + serverSelectedDeposits.length;
    setDepositsCount(count);
  }

  function showDepositModal() {
    setVisible(true);
  }

  return (
    <View>
      <Pressable onPress={showDepositModal}>
        <View style={styles.container}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{depositsCount}</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Select Deposit</Text>
          </View>
        </View>
      </Pressable>
      <InvoiceDetailModal visible={visible} setVisibile={setVisible}/>
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
