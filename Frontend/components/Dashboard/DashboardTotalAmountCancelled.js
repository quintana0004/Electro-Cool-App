import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountCanceledToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";

function DashboardTotalAmountCancelled({
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
          Title={Title}
          HeightIcon={HeightIcon}
          WidthIcon={WidthIcon}
          ImageIcon={ImageIcon}
          ShowCount={true}
          CountToDisplay={data.count}
          AmountToDisplay={data.totalAmount}
          CountFontSize={CountFontSize}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountCancelled;
