import { Dimensions, FlatList, View } from "react-native";

import TableHeaderSetting from "./TableHeaderSetting";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllUsers } from "../../api/users.api";
import { useSettingStore } from "../../Store/settingStore";
import TableItemSetting from "./TableItemSetting";
import { useState } from "react";
import ErrorDialog from "../UI/ErrorDialog";
<<<<<<< HEAD
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";

function settingRender(itemData) {
  console.log(itemData.item);
=======

function settingRender(itemData) {
>>>>>>> 573a2fa58d74b15b80739a980ceacf6b881c9740
  return <TableItemSetting data={itemData.item} />;
}

function TableListSetting({ setSearchLoading, searchTerm, searchLoading }) {
  const reloadSettingList = useSettingStore((state) => state.reloadSettingList);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

<<<<<<< HEAD
  const [errorMessage, setErrorMessage] = useState(
    "The server has a little issue, try refeshing again."
  );

  const toggleReloadSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );

  const { isLoading, data, isError, error } = useQuery({
=======
  const { isLoading, data } = useQuery({
>>>>>>> 573a2fa58d74b15b80739a980ceacf6b881c9740
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

<<<<<<< HEAD
  if (isLoading) {
    return (
      <View style={{ marginTop: 400 }}>
        <LoadingOverlay />
      </View>
    );
  }

  function errorHandler() {
    toggleReloadSettingList();
  }

  if (isError) {
    return (
      <View style={{ marginTop: 200 }}>
        <ErrorOverlay onConfirm={errorHandler} message={errorMessage} />
      </View>
    );
  }

=======
>>>>>>> 573a2fa58d74b15b80739a980ceacf6b881c9740
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
