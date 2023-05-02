import { View, Text, StyleSheet, Image } from "react-native";

function DashboardCard({
  Title,
  CountToDisplay,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  return (
    <View style={[styles.Button]}>
      <Image
        style={[styles.IconBigButton, { height: HeightIcon, width: WidthIcon }]}
        source={ImageIcon}
      />
      <Text style={styles.SmallText}>{Title}</Text>
      <Text style={[styles.ButtonTextBig, { fontSize: CountFontSize }]}>
        {CountToDisplay}
      </Text>
    </View>
  );
}

export default DashboardCard;

const styles = StyleSheet.create({
  Button: {
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    width: 143,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 15,
    marginLeft: 3,
    marginRight: 3,
  },
  IconBigButton: {
    resizeMode: "contain",
    alignSelf: "baseline",
    marginLeft: 10,
    backgroundColor: "white",
  },
  ButtonTextBig: {
    fontSize: 55,
    fontWeight: "bold",
    alignSelf: "center",
  },
  SmallText: {
    fontSize: 15,
    marginBottom: 0,
  },
});
