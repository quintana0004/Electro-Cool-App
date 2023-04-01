import { Text, View } from "react-native";
import { useCustomerInfoStore } from "../components/Client Book/customerStore";

const setCustomerInfo = useCustomerInfoStore((state) => state.setCustomerInfo);

function CustomerInformation() {
  return (
    <View>
      <Text> {firstName} </Text>
    </View>
  );
}

export default CustomerInformation;
