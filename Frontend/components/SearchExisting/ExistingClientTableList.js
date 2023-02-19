import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllClients } from "../../api/clients.api";

import ExistingClientTableHeader from "./ExistingClientTableHeader";
import ExistingClientTableItem from "./ExistingClientTableItem";
import { useState } from "react";

function ExistingClientTableList({ searchTerm, setClient }) {
  // TODO:
  // 1. Develop Search Functionality - DONE
  // 2. Add button Footers with Navigation - DONE
  // 3. Add validation before navigating to the next screen (if no item is selected)
  // 4. Pass state on navigation to next screen - DONE
  // 5. Test the infinite scroll functionality

  const TAKE = 15;
  const [tableData, setTableData] = useState([]);

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["ExistingClientData", searchTerm],
    getExistingClientData,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.isLastPage ? undefined : lastPage.data.currentPage + 1;
      },
    },
    {
      enabled: true,
    }
  );

  async function getExistingClientData({ pageParam = 0 }) {
    let data = await httpGetAllClients(TAKE, pageParam, searchTerm);

    let initialTableData = getTableData(tableData, data);
    setTableData(initialTableData);

    return data;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function getTableData(clientTableData, serverTableData) {
    let currentTableDataMap = {};
    for (const item of clientTableData) {
      currentTableDataMap[item.id] = item;
    }

    let updatedClientTableData = [];
    const serverData = serverTableData.data.data;
    for (const item of serverData) {
      const tableItem = currentTableDataMap[item.id];
      if (tableItem) {
        item.selected = tableItem.selected;
        updatedClientTableData.push(item);
      } else {
        item.selected = false;
        updatedClientTableData.push(item);
      }
    }

    return updatedClientTableData;
  }

  function updateSelectedItem(id, value) {
    const updatedTableData = tableData.map((item) => {
      if (item.id === id) {
        item.selected = value;
      } else {
        item.selected = false;
      }

      return item;
    });

    const selectedClient = updatedTableData.find((item) => item.selected === true);
    setClient(selectedClient);

    setTableData(updatedTableData);
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
          data={tableData}
          renderItem={renderTableItem}
          estimatedItemSize={10}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default ExistingClientTableList;
