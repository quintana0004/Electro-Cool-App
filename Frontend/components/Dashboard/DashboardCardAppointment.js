import { StyleSheet, Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import Figures from "../../constants/figures/Figures";
import { useQuery } from "@tanstack/react-query";
import { httpGetTotalAmountAppointmentsToday } from "../../api/metrics.api";

function DashboardCardAppointment() {
  const { isLoading, isError, refetch, data } = useQuery({
    queryKey: ["DashboardTotalAppointmentsToday"],
    queryFn: getDashboardTotalAppointmentsToday,
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 Minutes Stale Time
  });

  async function getDashboardTotalAppointmentsToday(page = 0) {
    const response = await httpGetTotalAmountAppointmentsToday();
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
          source={Figures.totalAmountAppointments}
          style={{
            height: 40,
            width: 40,
          }}
        />

        <View style={{ width: 190, marginLeft: 5 }}>
          <Text
            style={[styles.ButtonTextBig, { fontSize: 16, fontWeight: "bold" }]}
          >
            Total Amount of Appointments Today
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 250,
          height: 200,
          marginBottom: 0,
        }}
      >
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

export default DashboardCardAppointment;

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
    marginTop: 0,
    marginLeft: 3,
    marginRight: 5,
  },
  ButtonTextBig: {
    fontSize: 55,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
