import { Dimensions, FlatList, View } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getFlattenedData, transformData } from "../../../utils/reactQuery.utils";
import ExistingCarItemTableItem from "./ExistingCarTableItem";
import ExistingCarTableHeader from "./ExistingCarTableHeader";
import { httpGetAllCars } from "../../../api/cars.api";

function ExistingCarTableList({ searchTerm, selectedCar, setCar }) {
  const TAKE = 15;
  const queryClient = useQueryClient();

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["ExistingCarData", searchTerm],
    queryFn: getExistingCarData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage ? undefined : lastPage.data.currentPage + 1;
    },
    select: (data) => {
      return transformData(data, setDefaultSelectedField);
    },
    enabled: true,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });

  function setDefaultSelectedField(car) {
    return {
      ...car,
      selected: car.id === selectedCar?.id,
    };
  }

  async function getExistingCarData({ pageParam = 0 }) {
    let data = await httpGetAllCars(TAKE, pageParam, searchTerm);
    return data;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function updateSelectedItem(id, value) {
    queryClient.setQueryData(["ExistingCarData", searchTerm], (oldData) => {
      const newPages = {
        ...transformData(oldData, setSelectedCar, id, value),
      };
      return newPages;
    });
  }

  function setSelectedCar(car, args) {
    const [id, value] = args;

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

  return (
    <View style={{ height: 615, width: Dimensions.get("screen").width }}>
      <ExistingCarTableHeader />
      {isLoading || (
        <FlatList
          data={getFlattenedData(data)}
          renderItem={renderTableItem}
          estimatedItemSize={10}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default ExistingCarTableList;
