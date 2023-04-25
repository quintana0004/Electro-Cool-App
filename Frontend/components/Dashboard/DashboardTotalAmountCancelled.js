import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountCanceledToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";

function DashboardTotalAmountCancelled({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardTotalAmountCancelledReceived"],
    queryFn: getDashboardTotalAmountCancelled,
    enabled: true,
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
          CountToDisplay={data.metric}
          CountFontSize={CountFontSize}
        />
      )}
    </View>
  );
}

export default DashboardTotalAmountCancelled;
