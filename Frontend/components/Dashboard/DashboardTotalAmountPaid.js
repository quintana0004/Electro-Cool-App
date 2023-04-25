import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetNewVehiclesReceivedToday } from "../../api/metrics.api";
import DashboardCardInvoice from "./DashboardCardInvoice";

function DashboardTotalAmountPaid({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardTotalAmountPaidReceived"],
    queryFn: getDashboardTotalAmountPaid,
    enabled: true,
  });

  async function getDashboardTotalAmountPaid(page = 0) {
    const response = await httpGetNewVehiclesReceivedToday();
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

export default DashboardTotalAmountPaid;
