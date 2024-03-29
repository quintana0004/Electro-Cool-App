import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllPendingInvoices } from "../../api/invoices.api";
import DashboardInvoiceTableListItem from "./DashboardInvoiceTableListItem";
import { useInvoiceStore } from "../../Store/invoiceStore";

function DashboardInvoiceTableList({ setSelectedInvoiceId, setModalVisible }) {
  const reloadInvoiceList = useInvoiceStore((state) => state.reloadInvoiceList);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardInvoicesData", reloadInvoiceList],
    queryFn: getInvoicesData,
    enabled: true,
  });

  async function getInvoicesData() {
    const response = await httpGetAllPendingInvoices();
    return response.data;
  }

  function renderTableItem({ item }) {
    return (
      <DashboardInvoiceTableListItem
        invoiceId={item.id}
        clientName={`${item.customer.lastName}, ${item.customer.firstName}`}
        setModalVisible={setModalVisible}
        setSelectedInvoiceId={setSelectedInvoiceId}
      />
    );
  }

  return (
    <View style={styles.container}>
      {isLoading || <FlatList data={data} renderItem={renderTableItem} />}
    </View>
  );
}

export default DashboardInvoiceTableList;

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
