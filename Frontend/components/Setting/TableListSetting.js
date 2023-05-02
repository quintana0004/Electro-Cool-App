import { Dimensions, FlatList, View } from "react-native";

import TableHeaderSetting from "./TableHeaderSetting";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllUsers } from "../../api/users.api";
import { useSettingStore } from "../../Store/settingStore";
import TableItemSetting from "./TableItemSetting";
import { useState } from "react";
import ErrorDialog from "../UI/ErrorDialog";

function settingRender(itemData) {
  return <TableItemSetting data={itemData.item} />;
}

function TableListSetting({ setSearchLoading, searchTerm, searchLoading }) {
  const reloadSettingList = useSettingStore((state) => state.reloadSettingList);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["RBACHomePage", searchTerm, reloadSettingList],
    queryFn: getSettingScreenData,
    enabled: true,
  });

  async function getSettingScreenData() {
    let response = await httpGetAllUsers(searchTerm);

    if (searchLoading) {
      setSearchLoading(false);
    }

    if (response.hasError) {
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
      return;
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
      <ErrorDialog
        dialogVisible={errorDialogVisible}
        setDialogVisible={setErrorDialogVisible}
        errorMSG={errorMSG}
      />
    </View>
  );
}

export default TableListSetting;
