import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllPendingInvoices } from "../../api/invoices.api";
import DashboardInvoiceTableListItem from "./DashboardInvoiceTableListItem";
import { useInvoiceStore } from "../../Store/invoiceStore";
import httpGetAllCars from "../../api/cars.api";
import CurrentVehiclesWorkingWith from "./CurrentVehiclesWorkingWith";
import Figures from "../../constants/figures/Figures";

function DashboardCurrentVehicles({
  HeightIcon,
  WidthIcon,
  SecondText,
  testfigure,
}) {
  console.log("Buenos dias");
  const reloadInvoiceList = useInvoiceStore((state) => state.reloadInvoiceList);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardInvoicesData", reloadInvoiceList],
    queryFn: getInvoicesData,
    enabled: true,
  });
  const take = 15;
  const searchTerm = "";
  async function getInvoicesData(page = 0) {
    const response = await httpGetAllCars(take, page, searchTerm);
    console.log(
      "INVOICES DATA FROM CARS PENDING CONFIRMATION: ",
      response.data
    );
    return response.data;
  }

  function renderTableItem({ item }) {
    return (
      <CurrentVehiclesWorkingWith
        HeightIcon={HeightIcon}
        WidthIcon={WidthIcon}
        testfigure={testfigure}
        SecondText={SecondText}
      />
    );
  }
  return (
    <View style={styles.container}>
      {isLoading || (
        <CurrentVehiclesWorkingWith
          HeightIcon={HeightIcon}
          WidthIcon={WidthIcon}
          testfigure={testfigure}
          SecondText={SecondText}
        />
      )}
    </View>
  );
}

export default DashboardCurrentVehicles;

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
