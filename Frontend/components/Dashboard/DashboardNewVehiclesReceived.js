import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetNewVehiclesReceivedToday } from "../../api/metrics.api";
import { useJobOrderStore } from "../../Store/JobOrderStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";

function DashboardNewVehiclesReceived({ setLoadingNewVehiclesReceived }) {
  const reloadJobOrderList = useJobOrderStore(
    (state) => state.reloadJobOrderList
  );

  useEffect(() => {
    refetch();
  }, [reloadJobOrderList]);

  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardNewVehiclesReceived"],
    queryFn: getNewVehiclesReceivedToday,
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 Minutes Stale Time
  });
  if (isLoading) {
    setLoadingNewVehiclesReceived(true);
  } else {
    setLoadingNewVehiclesReceived(false);
  }
  async function getNewVehiclesReceivedToday(page = 0) {
    const response = await httpGetNewVehiclesReceivedToday();
    return response.data;
  }

  return (
    <View>
      {isLoading || (
        <DashboardCard
          Title={"New Vehicles Received Today"}
          ImageIcon={Figures.NewIconDashboard}
          HeightIcon={52}
          WidthIcon={50}
          CountFontSize={55}
          CountToDisplay={data.metric}
        />
      )}
    </View>
  );
}

export default DashboardNewVehiclesReceived;
