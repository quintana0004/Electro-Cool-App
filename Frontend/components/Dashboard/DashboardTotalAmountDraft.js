import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetTotalAmountInDraftsToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";

function DashboardTotalAmountDraft({
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
    queryKey: ["DashboardTotalAmountDraftReceived"],
    queryFn: getDashboardTotalAmountDraft,
    enabled: true,
    staleTime: 1000 * 60 * 30, // Stale time of 30 minutes
  });

  async function getDashboardTotalAmountDraft(page = 0) {
    const response = await httpGetTotalAmountInDraftsToday();
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
          CountToDisplay={data.count}
          ShowCount={true}
          AmountToDisplay={data.totalAmount}
          CountFontSize={CountFontSize}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountDraft;
