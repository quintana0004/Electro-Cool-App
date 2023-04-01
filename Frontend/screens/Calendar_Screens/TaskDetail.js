import { Text, View } from "react-native";
import TableHeaderCalendar from "../../components/Calendar/TableHeaderCalendar";
import TableListTasks from "../../components/Calendar/TableListTasks";

function TaskDetail() {
  return (
    <View>
      <TableHeaderCalendar />

      <TableListTasks />
    </View>
  );
}

export default TaskDetail;
