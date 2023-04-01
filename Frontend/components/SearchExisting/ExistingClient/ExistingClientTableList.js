import { Dimensions, FlatList, View } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { httpGetAllClients } from "../../../api/clients.api";
import { getFlattenedData, transformData } from "../../../utils/reactQuery.utils";
import ExistingClientTableHeader from "./ExistingClientTableHeader";
import ExistingClientTableItem from "./ExistingClientTableItem";

function ExistingClientTableList({
  searchTerm,
  selectedClient,
  setClient,
  searchLoading,
  setSearchLoading,
}) {
  const TAKE = 15;
  const queryClient = useQueryClient();

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["ExistingClientData", searchTerm],
    queryFn: getExistingClientData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage ? undefined : lastPage.data.currentPage + 1;
    },
    select: (data) => {
      return transformData(data, setDefaultSelectedField);
    },
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  function setDefaultSelectedField(client) {
    return {
      ...client,
      selected: client.id === selectedClient?.id,
    };
  }

  async function getExistingClientData({ pageParam = 0 }) {
    let data = await httpGetAllClients(TAKE, pageParam, searchTerm);

    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

    return data;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function updateSelectedItem(id, value) {
    queryClient.setQueryData(["ExistingClientData", searchTerm], (oldData) => {
      const newPages = {
        ...transformData(oldData, setSelectedClient, id, value),
      };
      return newPages;
    });
  }

  function setSelectedClient(client, args) {
    const [id, value] = args;

    if (id === client.id) {
      setClient(client);
    }

    return {
      ...client,
      selected: client.id === id ? value : false,
    };
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      selected: item.selected,
    };

    return <ExistingClientTableItem itemData={itemInfo} onSelected={updateSelectedItem} />;
  }

  return (
    <View style={{ height: 720, width: Dimensions.get("screen").width }}>
      <ExistingClientTableHeader />
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

export default ExistingClientTableList;
