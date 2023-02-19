import { Dimensions, FlatList, View } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { httpGetAllClients } from "../../../api/clients.api";
import ExistingClientTableHeader from "./ExistingClientTableHeader";
import ExistingClientTableItem from "./ExistingClientTableItem";

function ExistingClientTableList({ searchTerm, selectedClient, setClient }) {
  const TAKE = 15;
  const queryClient = useQueryClient();

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["ExistingClientData", searchTerm],
    queryFn: getExistingClientData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage ? undefined : lastPage.data.currentPage + 1;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => {
          return {
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((client) => {
                return {
                  ...client,
                  selected: client.id === selectedClient?.id,
                };
              }),
            },
          };
        }),
      };
    },
    enabled: true,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });

  async function getExistingClientData({ pageParam = 0 }) {
    let data = await httpGetAllClients(TAKE, pageParam, searchTerm);
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
        ...oldData,
        pages: oldData.pages.map((page) => {
          return {
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((client) => {
                if (id === client.id) {
                  setClient(client);
                }
                return {
                  ...client,
                  selected: client.id === id ? value : false,
                };
              }),
            },
          };
        }),
      };
      return newPages;
    });
  }

  function getTableDataFlattened() {
    let tableData = [];

    for (const items of data.pages.map((p) => p.data).flat()) {
      tableData.push(...items.data);
    }

    return tableData;
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
    <View style={{ height: 500, width: Dimensions.get("screen").width }}>
      <ExistingClientTableHeader />
      {isLoading || (
        <FlatList
          data={getTableDataFlattened()}
          renderItem={renderTableItem}
          estimatedItemSize={10}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default ExistingClientTableList;
