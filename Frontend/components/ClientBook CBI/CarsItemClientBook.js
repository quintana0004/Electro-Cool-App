import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

import Figures from "../../constants/figures/Figures";
import Colors from "../../constants/Colors/Colors";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function CarItemCB({ itemData }) {
  const {
    ID,
    brand,
    model,
    licensePlate,
    color,
    year,
    mileage,
    vinNumber,
    date,
  } = itemData;

  function showCarInfo() {
    console.log("Bryan es Pato pero mas PATO SOY YO");
  }

  return (
    <View style={styles.container}>
      <Pressable style={{ margin: 10, width: 200 }} onPress={showCarInfo}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Avatar.Icon
            size={60}
            icon={Figures.ClientBookEachCar}
            color="black"
            style={{ backgroundColor: "#D9D9D9" }}
          />
          <View style={{ width: "100%", alignItems: "center", margin: 7 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              {brand}, {model}
            </Text>
          </View>

          <Text style={{ fontWeight: "600", fontSize: 17 }}>{year}</Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 17,
              backgroundColor: "black",
              color: "white",
              paddingHorizontal: 20,
              paddingVertical: 3,
              borderRadius: 10,
            }}
          >
            {licensePlate}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CarItemCB;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    elevation: 5,
    margin: 15,
  },
});
