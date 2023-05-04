import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetTotalAmountInDraftsToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";

function DashboardTotalAmountDraft({ setLoadingTotalAmountDraft }) {
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
  if (isLoading) {
    setLoadingTotalAmountDraft(true);
  } else {
    setLoadingTotalAmountDraft(false);
  }
  async function getDashboardTotalAmountDraft(page = 0) {
    const response = await httpGetTotalAmountInDraftsToday();
    return response.data;
  }

  return (
    <View>
      {isLoading || (
        <DashboardCardInvoice
          Title={"Total Amount in Drafts"}
          ImageIcon={Figures.totalDraft}
          HeightIcon={62}
          WidthIcon={60}
          CountFontSize={55}
          CountToDisplay={data.count}
          ShowCount={true}
          AmountToDisplay={data.totalAmount}
          size={6}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountDraft;
