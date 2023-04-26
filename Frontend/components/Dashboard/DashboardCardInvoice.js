import { View, Text, StyleSheet, Image } from "react-native";

function DashboardCardInvoice({
  Title,
  ShowCount,
  CountToDisplay,
  AmountToDisplay,
  HeightIcon,
  WidthIcon,
  ImageIcon,
  CountFontSize,
}) {
  console.log("Amount To Display: ", AmountToDisplay);
  console.log("Count To Display: ", CountToDisplay);
  return (
    <View style={[styles.Button]}>
      <Image
        style={[styles.IconBigButton, { height: HeightIcon, width: WidthIcon }]}
        source={ImageIcon}
      />

      <Text style={styles.SmallText}>{Title}</Text>
      {ShowCount && (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text
            style={[styles.SmallText, { fontSize: 12, fontWeight: "bold" }]}
          >
            AMT
          </Text>
          <Text
            style={[styles.SmallText, { fontSize: 22, fontWeight: "bold" }]}
          >
            {" " + CountToDisplay}
          </Text>
        </View>
      )}
      <View style={styles.quantityButtonStyle}>
        <Text style={[styles.ButtonTextBig, { fontSize: 20 }]}>
          ${AmountToDisplay}
        </Text>
      </View>
    </View>
  );
}

export default DashboardCardInvoice;

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
  quantityButtonStyle: {
    backgroundColor: "#cccccc",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});
