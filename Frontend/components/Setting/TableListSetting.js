import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import TableHeaderSetting from "./TableHeaderSetting";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllUsers } from "../../api/users.api";
import { useSettingStore } from "../../Store/settingStore";
import TableItemSetting from "./TableItemSetting";

function settingRender(itemData) {
  return <TableItemSetting data={itemData.item} />;
}

function TableListSetting({ setSearchLoading, searchTerm, searchLoading }) {
  const toggleSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );

  const { isLoading, data } = useQuery({
    queryKey: ["RBACHomePage", searchTerm, toggleSettingList],
    queryFn: getSettingScreenData,
    enabled: true,
  });

  async function getSettingScreenData() {
    let response = await httpGetAllUsers(searchTerm);

    if (searchLoading) {
      setSearchLoading(false);
    }

    return response.data;
  }

  return (
    <View
      style={{
        height: 850,
        width: Dimensions.get("screen").width,
      }}
    >
      <TableHeaderSetting />
      {isLoading || (
        <FlatList
          data={data}
          renderItem={settingRender}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

export default TableListSetting;
