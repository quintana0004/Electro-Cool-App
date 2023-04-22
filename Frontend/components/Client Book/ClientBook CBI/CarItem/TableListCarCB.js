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
import CarModal from "./CarModal";

import { httpGetAllOfCustomer } from "../../../../api/cars.api";
import CarItemCB from "./CarsItemClientBook";
import { useState } from "react";
import { Modal } from "react-native-paper";
import { CBCustomerInfoStore } from "../../../../Store/JobOrderStore";

function CarList({ searchLoading, setSearchLoading, searchTerm, customerId }) {
  const [VehicleData, setVehicleData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const reloadClientBookCarList = CBCustomerInfoStore(
    (state) => state.reloadClientBookCarList
  );

  const { isLoading, data, hasNextPage, fetchNextPage } = useQuery({
    queryKey: ["ClientBookHomeData", customerId, reloadClientBookCarList],
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
      id: item.id,
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
    <View style={[modalVisible ? styles.ModalContiner : styles.itemsContainer]}>
      <View style={{ alignItems: "center" }}>
        {isLoading || (
          <FlatList
            data={VehicleData}
            renderItem={renderCarTableItem}
            onEndReached={loadMoreData}
            numColumns={2}
          />
        )}
      </View>

      <Modal visible={modalVisible} style={styles.ModalScreen}>
        <CarModal activateModal={setModalVisible} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalContiner: {
    margin: 20,
  },
  itemsContainer: { margin: 10 },
  ModalScreen: {
    backgroundColor: "#F7F7F7",
    borderColor: "#e3e1e1",
    borderWidth: 2,
    height: 440,
  },
});

export default CarList;
