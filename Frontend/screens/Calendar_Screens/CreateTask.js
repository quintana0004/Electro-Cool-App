import { Text, View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import MenuDropDown from "../../components/UI/MenuDropDown";
import Colors from "../../constants/Colors/Colors";
import TableListTasks from "../../components/CalendarDetail/TableListTasks";
import { TextInput } from "react-native-paper";

function CreateTask() {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown style={{ zIndex: 4 }} />
        <Appbar.Content></Appbar.Content>
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Enter Task"
          placeholder=""
          right={<TextInput.Affix text="/100" />}
        />
      </View>
      <TableListTasks />
      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    margin: 10,
    borderRadius: 30,
    width: 250,
  },
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default CreateTask;
