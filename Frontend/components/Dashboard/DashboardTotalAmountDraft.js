import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountInDraftsToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";

function DashboardTotalAmountDraft({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardTotalAmountDraftReceived"],
    queryFn: getDashboardTotalAmountDraft,
    enabled: true,
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
          CountToDisplay={data.metric}
          CountFontSize={CountFontSize}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountDraft;
