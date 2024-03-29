import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { httpGetNewVehiclesReceivedToday } from "../../api/metrics.api";
import { useJobOrderStore } from "../../Store/JobOrderStore";
import { useEffect } from "react";
import Figures from "../../constants/figures/Figures";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Portal, Modal } from "react-native-paper";
function DashboardNewVehiclesReceived({}) {
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

  async function getNewVehiclesReceivedToday(page = 0) {
    const response = await httpGetNewVehiclesReceivedToday();
    return response.data;
  }
  if (isError === true && isLoading === true) {
    isLoading = false;
  }
  return (
    <View>
      {isLoading ? (
        <Portal>
          <Modal
            visible={isLoading}
            contentContainerStyle={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <LoadingOverlay />
          </Modal>
        </Portal>
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
