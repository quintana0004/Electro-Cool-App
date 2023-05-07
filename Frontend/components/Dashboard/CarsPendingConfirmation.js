import { View, Text, StyleSheet, Image } from "react-native";
import Figures from "../../constants/figures/Figures";
import {useState} from "react";
import DashboardInvoiceItemModal from "../DashboardInvoiceItem/DashboardInvoiceItemModal";
import DashboardInvoiceTableList from "../DashboardInvoice/DashboardInvoiceTableList";

function CarsPendingConfirmation() {
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={[styles.ButtonHuge]}>
            <Image
                style={[
                    {
                        height: 40,
                        width: 42,
                        marginTop: 10,
                        marginRight: 10,
                    },
                ]}
                source={Figures.CarsPendingConfirmation}
            />

            <Text style={[{ fontSize: 18, fontWeight: "600" }]}>Cars Pending Confirmation</Text>
            {/* Invoice Table List Item */}
            <DashboardInvoiceTableList
              setSelectedInvoiceId={setSelectedInvoiceId}
              setModalVisible={setModalVisible}
            />
            <DashboardInvoiceItemModal
              invoiceId={selectedInvoiceId}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
        </View>
    );
}

export default CarsPendingConfirmation;

const styles = StyleSheet.create({
    ButtonHuge: {
        borderColor: "#cccccc",
        borderWidth: 4,
        borderRadius: 20,
        width: 310,
        height: 550,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 7,
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
