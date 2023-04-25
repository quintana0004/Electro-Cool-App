import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountPendingToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";

function DashboardTotalAmountPending({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardTotalAmountPendingReceived"],
    queryFn: getDashboardTotalAmountPending,
    enabled: true,
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
          CountToDisplay={data.metric}
          CountFontSize={CountFontSize}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountPending;
