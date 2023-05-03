import { Image, StyleSheet, Text, View } from "react-native";
import Figures from "../../constants/figures/Figures";

function AppointmentCard({ service }) {
  const { requestedService, serviceDetails, jobLoadType } = service;
  return (
    <View style={styles.card}>
      <Image style={styles.cardIcon} source={Figures.AppointmentCardIcon} />
      <Text style={styles.title}>Appointment Information</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Service: </Text>
        <Text>{requestedService}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Load of the Job: </Text>
        <Text>{jobLoadType}</Text>
      </View>
      <View>
        <Text style={styles.label}>Specifications and Observations: </Text>
        <Text style={{ textAlign: "center" }}>
          {serviceDetails ? serviceDetails : "None"}
        </Text>
      </View>
    </View>
  );
}

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 530,
    alignContent: "center",
    left: 30,
  },
  cardIcon: {
    position: "absolute",
    top: -25,
    left: "50%",
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
