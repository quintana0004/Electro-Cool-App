import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountPendingToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";

function DashboardTotalAmountPending({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
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

  return (
    <View>
      {isLoading || (
        <DashboardCardInvoice
          Title={Title}
          HeightIcon={HeightIcon}
          WidthIcon={WidthIcon}
          ImageIcon={ImageIcon}
          AmountToDisplay={data.metric}
          CountFontSize={CountFontSize}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountPending;
