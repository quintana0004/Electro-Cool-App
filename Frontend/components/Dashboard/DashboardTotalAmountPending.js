import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountPendingToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Modal, Portal } from "react-native-paper";
function DashboardTotalAmountPending({}) {
  const reloadInvoiceList = useInvoiceStore((state) => state.reloadInvoiceList);

  useEffect(() => {
    refetch();
  }, [reloadInvoiceList]);

  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardTotalAmountPendingReceived"],
    queryFn: getDashboardTotalAmountPending,
    enabled: true,
    staleTime: 1000 * 60 * 30, // Stale time of 30 minutes
  });

  async function getDashboardTotalAmountPending(page = 0) {
    const response = await httpGetTotalAmountPendingToday();
    return response.data;
  }
  if (isError === true && isLoading === true) {
    isLoading = false;
  }
  return (
    <View>
      {isLoading ? (
        <Portal>
          <Modal
            visible={isLoading}
            contentContainerStyle={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <LoadingOverlay />
          </Modal>
        </Portal>
      ) : isError ? ( //si isLoading es true va hacerle render al overlay y cuando isLoading sea false pues ahi le hace render al component perse.
        <View
          style={{
            zIndex: 10,
            margin: 0,
            position: "relative",

            backgroundColor: "#fff",
          }}
        >
          <DashboardErrorOverlay message={"Error"} onConfirm={refetch} />
        </View>
      ) : (
        <DashboardCardInvoice
          Title={"Total Amount in Pending Today"}
          ImageIcon={Figures.totalAmountPending}
          HeightIcon={59}
          WidthIcon={60}
          CountFontSize={55}
          AmountToDisplay={data.metric}
          size={40}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountPending;
