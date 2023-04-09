import { useQuery } from "@tanstack/react-query";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import CarModal from "./CarModal";

import { httpGetAllCars, httpGetAllOfCustomer } from "../../../../api/cars.api";
import CarItemCB from "./CarsItemClientBook";
import { useState } from "react";
import { Modal } from "react-native-paper";

function CarList({ searchLoading, setSearchLoading, searchTerm, customerId }) {
  const TAKE = 15;

  const [VehicleData, setVehicleData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const { isLoading, data, hasNextPage, fetchNextPage } = useQuery({
    queryKey: ["ClientBookHomeData", customerId],
    queryFn: getClientBookHomeScreenData,
    enabled: true,
  });

  async function getClientBookHomeScreenData() {
    let data = null;
    data = await httpGetAllOfCustomer(searchTerm, customerId);
    setVehicleData(data.data);
    if (searchLoading) {
      setSearchLoading(false);
    }
    return data.data;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  //Car Items
  function renderCarTableItem({ item }) {
    const itemInfo = {
      ID: item.id,
      brand: item.brand,
      model: item.model,
      licensePlate: item.licensePlate,
      color: item.color,
      year: item.year,
      mileage: item.mileage,
      vinNumber: item.vinNumber,
      date: item.createdDate,
    };
    return <CarItemCB itemData={itemInfo} activateModal={setModalVisible} />;
  }

  return (
    <View style={styles.listContainer}>
      <View>
        {isLoading || (
          <FlatList
            data={VehicleData}
            renderItem={renderCarTableItem}
            onEndReached={loadMoreData}
            numColumns={2}
          />
        )}
      </View>

      <Modal
        visible={modalVisible}
        style={{ backgroundColor: "#F7F7F7" }}
        contentContainerStyle={{ margin: 30 }}
      >
        <CarModal></CarModal>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    height: 713,
    marginHorizontal: 40,
  },
});

export default CarList;
