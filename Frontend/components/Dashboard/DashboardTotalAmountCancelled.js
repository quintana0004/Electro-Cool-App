import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetTotalAmountCanceledToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";

function DashboardTotalAmountCancelled() {
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

  return (
    <View>
      {isLoading || (
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
