import { Text, View } from "react-native";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";

function CustomerInformation() {
  const firstNameStore = useCustomerInfoStore((state) => state.firstName);

  return (
    <View>
      <Text>{firstNameStore}</Text>
    </View>
  );
}

export default CustomerInformation;
