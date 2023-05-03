import { Image, StyleSheet, Text, View } from "react-native";
import Figures from "../../constants/figures/Figures";

function DateforAppointmentCard({}) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardIcon}
        source={Figures.DateforAppointmentCardIcon}
      />
      <Text style={styles.title}>Date & Time</Text>

      <View style={styles.labelContainer}></View>
    </View>
  );
}

export default DateforAppointmentCard;

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
    top: 30,
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
    marginTop: 10,
  },
});
