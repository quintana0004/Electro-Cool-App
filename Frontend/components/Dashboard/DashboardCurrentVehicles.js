import { View, Modal } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetCurrentVehicles } from "../../api/metrics.api";
import { useJobOrderStore } from "../../Store/JobOrderStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";
import LoadingOverlay from "../UI/LoadingOverlay";
import DashboardErrorOverlay from "./DashboardErrorOverlay";
function DashboardCurrentVehicles({}) {
  const reloadJobOrderList = useJobOrderStore(
    (state) => state.reloadJobOrderList
  );

  useEffect(() => {
    refetch();
  }, [reloadJobOrderList]);

  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardCurrentVehiclesWorking"],
    queryFn: getCurrentWorkingVehicles,
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 Minutes Stale Time
  });

  async function getCurrentWorkingVehicles(page = 0) {
    const response = await httpGetCurrentVehicles();
    return response.data;
  }
  if (isError === true && isLoading === true) {
    isLoading = false;
  }
  return (
    <View>
      {isLoading ? (
        <Modal visible={isLoading} animationType="fade">
          <LoadingOverlay />
        </Modal>
      ) : isError ? ( //si isLoading es true va hacerle render al overlay y cuando isLoading sea false pues ahi le hace render al component perse.
        <View
          style={{
            zIndex: 10,
            margin: 0,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <DashboardErrorOverlay message={"Error"} onConfirm={refetch} />
        </View>
      ) : (
        <DashboardCard
          Title={"Current Vehicles Working With"}
          ImageIcon={Figures.Wheel}
          HeightIcon={50}
          WidthIcon={50}
          CountFontSize={55}
          CountToDisplay={data.metric}
        />
      )}
    </View>
  );
}

export default DashboardCurrentVehicles;
