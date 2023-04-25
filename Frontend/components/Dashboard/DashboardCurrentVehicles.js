import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetCurrentVehicles } from "../../api/metrics.api";

function DashboardCurrentVehicles({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["DashboardCurrentVehiclesWorking"],
    queryFn: getCurrentWorkingVehicles,
    enabled: true,
  });

  async function getCurrentWorkingVehicles(page = 0) {
    const response = await httpGetCurrentVehicles();
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

export default DashboardCurrentVehicles;
