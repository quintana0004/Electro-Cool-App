import {Button, Card, Modal, Portal} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import ClientCard from "../UI/ClientCard";
import CarCard from "../UI/CarCard";

function DashboardInvoiceItemModal({ invoiceId, modalVisible, setModalVisible }) {

    // TODO:
    // * We need to pass the invoice id that was selected from the parent component.
    // * Query the data in this component from the server - THIS IS THE WINNER
    // * We pass the data to the list component

    return (
        <Portal>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
            >
                <Card style={[styles.modalContainer]}>
                    <View style={{ flexDirection: "column" }}>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: 25,
                            }}
                        >
                            Invoice
                        </Text>
                        <Card.Actions style={{ alignSelf: "center" }}>
                            <Button
                                buttonColor="#E5B126"
                                textColor="black"
                                borderColor="#E5B126"
                                mode="contained"
                                style={[
                                    {
                                        borderRadius: 20,
                                    },
                                ]}
                            >
                              #{invoiceId}
                            </Button>
                        </Card.Actions>
                    </View>
                    {/*<View style={{ flexDirection: "row" }}>*/}
                    {/*    <ClientCard client={clientInfo} />*/}
                    {/*    <View style={{ marginLeft: 10 }}>*/}
                    {/*        <CarCard car={carInfo} />*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {
                        //en esta seccion se encuentra el boton del modal que nos da el total
                    }
                    {/*<InvoiceDetailTableList invoiceItems={data} />*/}
                    <Card.Actions style={{ alignSelf: "center" }}>
                        <Button
                            buttonColor="#A9D9C2"
                            textColor="black"
                            borderColor="#A9D9C2"
                            mode="contained"
                            style={[
                                {
                                    borderRadius: 20,
                                },
                            ]}
                        >
                            Total: $500.36
                        </Button>
                    </Card.Actions>
                    {
                        //en esta seccion se encuentra el boton del modal que dicen cancel y confirmation
                    }
                    <Card.Actions>
                        <Button
                            title="Cancel"
                            onPress={() => setModalVisible(false)}
                            buttonColor="#C4E2E2"
                            textColor="#138A8C"
                            borderColor="#138A8C"
                            mode="contained"
                            style={[{ borderRadius: 10 }]}
                        >
                            Cancel
                        </Button>
                        <Button
                            title="Confirmation"
                            onPress={() => setModalVisible(false)}
                            buttonColor="#138A8C"
                            style={[{ borderRadius: 10 }]}
                        >
                            Confirmation
                        </Button>
                    </Card.Actions>
                </Card>
            </Modal>
        </Portal>
    );
}

export default DashboardInvoiceItemModal;

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "white",
      borderColor: "#cccccc",
      borderWidth: 4,
      borderRadius: 20,
      padding: 20,
      width: 500,
      height: 500,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
    }
});