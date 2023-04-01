import { Image, StyleSheet, Text, View } from "react-native";
import Figures from "../../constants/figures/Figures";

function CarCard({ car }) {
  const { brand, model, year, color, licensePlate } = car;
  return (
    <View style={styles.card}>
      <Image style={styles.cardIcon} source={Figures.CarCardIcon} />
      <Text style={styles.title}>Vehicle Information</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Brand: </Text>
        <Text>{brand}</Text>
        <Text style={styles.label}> Model: </Text>
        <Text>{model}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Year: </Text>
        <Text>{year}</Text>

        <Text style={styles.label}> Color: </Text>
        <Text>{color}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>License Plate: </Text>
        <Text>{licensePlate}</Text>
      </View>
    </View>
  );
}

export default CarCard;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
