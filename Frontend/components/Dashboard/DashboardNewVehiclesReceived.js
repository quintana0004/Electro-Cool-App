import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetNewVehiclesReceivedToday } from "../../api/metrics.api";

function DashboardNewVehiclesReceived({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardNewVehiclesReceived"],
    queryFn: getNewVehiclesReceivedToday,
    enabled: true,
  });

  async function getNewVehiclesReceivedToday(page = 0) {
    const response = await httpGetNewVehiclesReceivedToday();
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

export default DashboardNewVehiclesReceived;
