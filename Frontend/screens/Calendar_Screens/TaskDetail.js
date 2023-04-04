import { View } from "react-native";
import TableHeaderCalendar from "../../components/Calendar/TableHeaderTasks";
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
