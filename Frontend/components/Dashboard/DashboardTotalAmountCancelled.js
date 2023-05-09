import { View, Modal } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetTotalAmountCanceledToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
function DashboardTotalAmountCancelled({}) {
  const reloadInvoiceList = useInvoiceStore((state) => state.reloadInvoiceList);

  useEffect(() => {
    refetch();
  }, [reloadInvoiceList]);

  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardTotalAmountCancelledReceived"],
    queryFn: getDashboardTotalAmountCancelled,
    enabled: true,
    staleTime: 1000 * 60 * 30, // Stale time of 30 minutes
  });

  async function getDashboardTotalAmountCancelled(page = 0) {
    const response = await httpGetTotalAmountCanceledToday();
    return response.data;
  }
  if (isError === true && isLoading === true) {
    isLoading = false;
  }
  return (
    <View>
      {isLoading ? (
        <Modal visible={isLoading} animationType="fade">
          <LoadingOverlay />
        </Modal>
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
          Title={"Total Amount in Cancelled"}
          ImageIcon={Figures.totalAmountCancelled}
          HeightIcon={56}
          WidthIcon={50}
          CountFontSize={55}
          ShowCount={true}
          CountToDisplay={data.count}
          AmountToDisplay={data.totalAmount}
          size={6}
          MarginAdjuster={20}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountCancelled;
