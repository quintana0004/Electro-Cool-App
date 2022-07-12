import { FlatList } from "react-native";
import JobItem from "./JobItem";

function JobList({ JobOrderInfo }) {
  function renderClientItem(ItemData) {
    return (
      <JobItem
        JobOrderNumber={ItemData.item.id}
        EntryDate={ItemData.item.JobOrderEntryDate}
        FirstName={ItemData.item.ClientFirstName}
        LastName={ItemData.item.ClientLastName}
        StartingStatus={ItemData.item.JobOrderStatus}
      />
    );
  }

  return (
    <FlatList
      data={JobOrderInfo}
      renderItem={renderClientItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default JobList;
