import { useQuery } from "@tanstack/react-query";
import {
  httpGetVehiclesInShop,
  httpGetVehiclesNotStarted,
} from "../../api/metrics.api";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Figures from "../../constants/figures/Figures";
import { useEffect } from "react";
import { useJobOrderStore } from "../../Store/JobOrderStore";

function DashboardVehiclesInShopAndNotStarted() {
  const reloadJobOrderList = useJobOrderStore(
    (state) => state.reloadJobOrderList
  );

  useEffect(() => {
    refetch();
  }, [reloadJobOrderList]);

  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardVehiclesInShopAndNotStarted"],
    queryFn: getVehiclesInShopAndNotStarted,
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 Minutes Stale Time
  });

  async function getVehiclesInShopAndNotStarted() {
    const vehiclesInShopResponse = await httpGetVehiclesInShop();
    const vehiclesNotStartedResponse = await httpGetVehiclesNotStarted();

    return {
      inShop: vehiclesInShopResponse.data.metric,
      notStarted: vehiclesNotStartedResponse.data.metric,
    };
  }

  return (
    <View>
      {isLoading || (
        <>
          <Card style={styles.ButtonSmall}>
            <Card.Cover
              source={Figures.VehicleInShop}
              style={styles.IconBigButton}
            />

            <Text style={styles.ButtonTextBig}>{data.inShop}</Text>
          </Card>

          <Card style={[styles.ButtonSmall, { marginTop: 8 }]}>
            <Text>Vehicles Not Started</Text>
            <Text style={styles.ButtonTextBig}>{data.notStarted}</Text>
          </Card>
        </>
      )}
    </View>
  );
}

export default DashboardVehiclesInShopAndNotStarted;

const styles = StyleSheet.create({
  ButtonSmall: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    width: 143,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 15,
    marginLeft: 3,
    marginRight: 3,
    paddingTop: 5,
  },
  IconBigButton: {
    resizeMode: "contain",
    alignSelf: "center",
    backgroundColor: "white",
    height: 52,
    width: 120,
  },
  ButtonTextBig: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
