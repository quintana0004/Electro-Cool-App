import { Alert, Dimensions, FlatList, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { httpGetCarsByCustomerId } from "../../../api/cars.api";
import ExistingCarItemTableItem from "./ExistingCarTableItem";
import ExistingCarTableHeader from "./ExistingCarTableHeader";

function ExistingCarTableList({
  customerId,
  searchTerm,
  selectedCar,
  setCar,
  searchLoading,
  setSearchLoading,
}) {
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["ExistingCarData", searchTerm],
    queryFn: getExistingCarData,
    select: (data) => {
      console.log("Data being received for Car: ", data);
      let modifiedCarData = data.map((car) => setDefaultSelectedField(car));
      console.log("Data Modified for Car: ", modifiedCarData);
      return modifiedCarData;
    },
    enabled: true,
  });

  function setDefaultSelectedField(car) {
    return {
      ...car,
      selected: car.id === selectedCar?.id,
    };
  }

  async function getExistingCarData() {
    let response = await httpGetCarsByCustomerId(customerId, searchTerm);

    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

    return response.data;
  }

  function updateSelectedItem(id, value) {
    queryClient.setQueryData(["ExistingCarData", searchTerm], (oldData) => {
      return oldData.map((car) => setSelectedCar(car, id, value));
    });
  }

  function setSelectedCar(car, id, value) {
    if (id === car.id) {
      setCar(car);
    }

    return {
      ...car,
      selected: car.id === id ? value : false,
    };
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      brand: item.brand,
      model: item.model,
      year: item.year,
      licensePlate: item.licensePlate,
      selected: item.selected,
    };

    return <ExistingCarItemTableItem itemData={itemInfo} onSelected={updateSelectedItem} />;
  }

  if (isError) {
    console.log("Error Fetching Existing Cars: ", error);
    Alert.alert("Error", "There was an error fetching existing cars. Please try again later.");
  }

  return (
    <View style={{ height: 720, width: Dimensions.get("screen").width }}>
      <ExistingCarTableHeader />
      {isLoading || (
        <FlatList
          data={data}
          renderItem={renderTableItem}
          estimatedItemSize={10}
        />
      )}
    </View>
  );
}

export default ExistingCarTableList;
