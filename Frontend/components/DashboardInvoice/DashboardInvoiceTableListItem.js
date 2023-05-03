import {Pressable, StyleSheet, Text, View} from "react-native";
import {Card} from "react-native-paper";

function DashboardInvoiceTableListItem({ invoiceId, clientName, setModalVisible, setSelectedInvoiceId }) {

  return (
    <Pressable onPress={() => {
      setSelectedInvoiceId(invoiceId);
      setModalVisible(true);
    }
    }>
      <Card
        style={[
          styles.cardStyle,
        ]}
      >
        <View style={{ flexDirection: "row", width: 200 }}>
          <Card.Content>
            <Text style={[{ marginLeft: 11, marginTop: 5 }]}>Invoice</Text>
            <Card
              style={[
                {
                  width: 65,
                  backgroundColor: "#cccccc",
                },
              ]}
            >
              <Text style={[{ alignSelf: "center" }]}>#{invoiceId}</Text>
            </Card>
          </Card.Content>

          <Text style={{ marginVertical: 15 }}>
            {clientName}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}

export default DashboardInvoiceTableListItem;

const styles = StyleSheet.create({
  cardStyle: {
    height: 65,
    width: 293,
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
})