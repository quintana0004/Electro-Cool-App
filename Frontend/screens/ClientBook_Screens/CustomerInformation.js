import { Text, View } from "react-native";
import { useCustomerInfoStore } from "../../Store/store";

function CustomerInformation() {
  const firstNameStore = useCustomerInfoStore((state) => state.firstName);

  return (
    <View>
      <Text>{firstNameStore}</Text>
    </View>
  );
}

export default CustomerInformation;
