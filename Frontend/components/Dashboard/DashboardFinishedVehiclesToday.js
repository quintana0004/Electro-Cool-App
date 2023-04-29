import {useEffect} from "react";
import {View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import {httpGetFinishedVehiclesToday} from "../../api/metrics.api";
import {useJobOrderStore} from "../../Store/JobOrderStore";
import Figures from "../../constants/figures/Figures";

function DashboardFinishedVehiclesToday() {
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
                Title={"Finished Vehicle of Today"}
                ImageIcon={Figures.Vehicle}
                HeightIcon={45}
                WidthIcon={65}
                CountFontSize={55}
                CountToDisplay={data.metric}
            />
        )}
      </View>
  );
}

export default DashboardFinishedVehiclesToday;
