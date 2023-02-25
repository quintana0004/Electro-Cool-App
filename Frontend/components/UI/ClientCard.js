import { Image, StyleSheet, Text, View } from "react-native";
import Figures from "../../constants/figures/Figures";

function ClientCard({ client }) {
  const { firstName, lastName, phone, email } = client;

  return (
    <View style={styles.card}>
      <Image style={styles.cardIcon} source={Figures.ClientCardIcon} />
      <Text style={styles.title}>Client Information</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Name: </Text>
        <Text>
          {firstName} {lastName}
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Email: </Text>
        <Text>{email}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Phone Number: </Text>
        <Text>{phone}</Text>
      </View>
    </View>
  );
}

export default ClientCard;

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
