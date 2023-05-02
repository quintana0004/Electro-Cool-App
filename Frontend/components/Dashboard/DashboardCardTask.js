import { StyleSheet, Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import Figures from "../../constants/figures/Figures";
import { useQuery } from "@tanstack/react-query";
import { httpGetTotalAmountTasksToday } from "../../api/metrics.api";

function DashboardCardTask() {
  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardTotalTasksToday"],
    queryFn: getDashboardTotalTasksToday,
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 Minutes Stale Time
  });

  async function getDashboardTotalTasksToday(page = 0) {
    const response = await httpGetTotalAmountTasksToday();
    return response.data;
  }

  return (
    <Card style={styles.ButtonSmall}>
      <View
        style={{
          flexDirection: "row",
          width: 170,
          marginTop: 8,
        }}
      >
        <Image
          source={Figures.totalAmountTasks}
          style={{
            height: 40,
            width: 40,
          }}
        />

        <View style={{ width: 190, marginLeft: 5 }}>
          <Text style={[styles.ButtonTextBig, { fontSize: 16 }]}>
            Total Amount of Task Today
          </Text>
        </View>
      </View>
      <View style={{ width: 250, height: 200, marginBottom: 0 }}>
        {isLoading || (
          <Text
            style={[
              styles.ButtonTextBig,
              { fontSize: 80, alignSelf: "center", marginTop: 30 },
            ]}
          >
            {data.metric}
          </Text>
        )}
      </View>
    </Card>
  );
}

export default DashboardCardTask;

const styles = StyleSheet.create({
  ButtonSmall: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    width: 270,
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginTop: 10,
    marginLeft: 3,
    marginRight: 5,
  },
  ButtonTextBig: {
    fontSize: 55,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
