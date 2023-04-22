import { Text, View, StyleSheet, Pressable, Modal } from "react-native";
import { Avatar } from "react-native-paper";

import Figures from "../../../../constants/figures/Figures";
import { useVehicleInfoStore } from "../../../../Store/JobOrderStore";

function CarItemCB({ itemData, activateModal }) {
  const {
    id,
    brand,
    licensePlate,
    model,
    year,
    mileage,
    color,
    vinNumber,
    date,
  } = itemData;

  function showCarInfo() {
    activateModal(true);
  }
  const setVehicleInfo = useVehicleInfoStore(
    (state) => state.setVehicleInformation
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={{ margin: 10, width: 200 }}
        onPress={() => {
          showCarInfo();
          setVehicleInfo(
            id,
            brand,
            licensePlate,
            model,
            year,
            mileage,
            color,
            vinNumber,
            "",
            "",
            ""
          );
        }}
      >
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
    alignItems: "center",
  },
});
