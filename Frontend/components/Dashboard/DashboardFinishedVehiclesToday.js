import { useEffect } from "react";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetFinishedVehiclesToday } from "../../api/metrics.api";
import { useJobOrderStore } from "../../Store/JobOrderStore";

function DashboardFinishedVehiclesToday({
  Title,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  const reloadJobOrderList = useJobOrderStore(
    (state) => state.reloadJobOrderList
  );

  useEffect(() => {
    refetch();
  }, [reloadJobOrderList]);

  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardFinishedVehiclesTodayReceived"],
    queryFn: getDashboardFinishedVehiclesToday,
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 Minutes Stale Time
  });

  async function getDashboardFinishedVehiclesToday(page = 0) {
    const response = await httpGetFinishedVehiclesToday();
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
