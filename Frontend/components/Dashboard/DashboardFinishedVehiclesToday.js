import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetTotalAmountPaidToday } from "../../api/metrics.api";

function DashboardFinishedVehiclesToday({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardFinishedVehiclesTodayReceived"],
    queryFn: getDashboardFinishedVehiclesToday,
    enabled: true,
  });

  async function getDashboardFinishedVehiclesToday(page = 0) {
    const response = await httpGetTotalAmountPaidToday();
    return response.data;
  }

  return (
    <View>
      {isLoading || (
        <DashboardCard
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

export default DashboardFinishedVehiclesToday;
