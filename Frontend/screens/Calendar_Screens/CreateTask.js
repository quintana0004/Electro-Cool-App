import { Text, View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import MenuDropDown from "../../components/UI/MenuDropDown";
import Colors from "../../constants/Colors/Colors";
import TableListTasks from "../../components/CalendarDetail/TableListTasks";

function CreateTask() {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown style={{ zIndex: 4 }} />
        <Appbar.Content></Appbar.Content>
      </Appbar.Header>
      <TableListTasks />
      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default CreateTask;
