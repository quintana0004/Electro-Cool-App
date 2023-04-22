import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Figures from "../../constants/figures/Figures";
import { Avatar, Button, Card, Modal, Portal } from "react-native-paper";
import ClientCard from "../UI/ClientCard";
import {
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";

import CarCard from "../UI/CarCard";
import InvoiceDetailTableList from "../InvoiceDetail/InvoiceDetailTableList";
function DashboardTables({
  navigation,
  testfigure,
  FirstText,
  SecondText,
  ThirdText,
  FourthText,
  HeightIcon,
  WidthIcon,
  MarginTable,
  Choice,
  MarginTableTop,
  HeightSmallIcon,
  HeightBig,
  WidthBig,
  margin,
  SecondTextSize,
  testfigure2,
  backgroundeffect,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const client = useCustomerInfoStore((state) => {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      addressLine1: state.addressLine1,
      addressLine2: state.addressLine2,
      state: state.state,
      city: state.city,
      phone: state.phone,
      email: state.email,
    };
  });
  const car = useVehicleInfoStore((state) => {
    return {
      id: state.id,
      brand: state.brand,
      licensePlate: state.licensePlate,
      model: state.model,
      year: state.year,
      mileage: state.mileage,
      color: state.color,
      vinNumber: state.vinNumber,
      carHasItems: state.carHasItems,
      carItemsDescription: state.carItemsDescription,
      customerId: state.customerId,
    };
  });
  const [clientInfo] = useState(client);
  const [carInfo] = useState(car);
  const [invoiceItems, setInvoiceItems] = useState([]);

  if (Choice == 1) {
    return (
      <View style={[styles.Button]}>
        <Image
          style={[
            styles.IconBigButton,
            { height: HeightIcon, width: WidthIcon },
          ]}
          source={testfigure}
        />
        <Text style={styles.SmallText}>{FirstText}</Text>
        <Text style={[styles.ButtonTextBig, { fontSize: SecondTextSize }]}>
          {SecondText}
        </Text>
      </View>
    );
  } else if (Choice == 2) {
    return (
      <View>
        <Card
          style={[
            styles.ButtonSmall,
            { height: HeightBig, width: WidthBig, marginTop: MarginTableTop },
          ]}
        >
          <Card.Cover
            source={testfigure}
            style={
              ([styles.IconBigButton], { height: HeightIcon, width: WidthIcon })
            }
          />

          <Text style={[styles.ButtonTextBig, { fontSize: SecondTextSize }]}>
            {SecondText}
          </Text>
        </Card>

        <Card
          style={[
            styles.ButtonSmall,
            { height: HeightBig, width: WidthBig, marginTop: 10 },
          ]}
        >
          <Text style={[{ fontWeight: "bold" }]}>{FirstText}</Text>
          <Text
            style={[
              styles.ButtonTextBig,
              { fontSize: SecondTextSize, alignSelf: "center" },
            ]}
          >
            {SecondText}
          </Text>
        </Card>
      </View>
    );
    //this choice builds a huge card with a card inside (Cars Pending Confirmation)
  } else if (Choice == 3) {
    return (
      <View style={[styles.ButtonHuge]}>
        <Image
          style={[
            {
              height: HeightIcon,
              width: WidthIcon,
              marginTop: 10,
              marginRight: 10,
            },
          ]}
          source={Figures.CarsPendingConfirmation}
        />

        <Text style={[{ fontSize: 18, fontWeight: "600" }]}>{FirstText}</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Card
            style={[
              styles.cardstyle,
              {
                height: 65,
                width: 293,
              },
            ]}
          >
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
                        #0014
                      </Button>
                    </Card.Actions>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <ClientCard client={clientInfo} />
                    <View style={{ marginLeft: 10 }}>
                      <CarCard car={carInfo} />
                    </View>
                  </View>
                  {
                    //en esta seccion se encuentra el boton del modal que nos da el total
                  }
                  <InvoiceDetailTableList invoiceItems={invoiceItems} />
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
            {
              //en esta seccion se encuentra el card que tiene la informacion del invoice con su ID y nombre del cliente
            }
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
                  <Text style={[{ alignSelf: "center" }]}>#1234</Text>
                </Card>
              </Card.Content>

              <Text style={{ marginVertical: 15 }}>
                Cristobal Colon the Conqueror
              </Text>
            </View>
          </Card>
        </Pressable>
        {
          //arreglar font size y verificar los styles a ver si todo esta en orden.
        }
      </View>
    );
    //this choice will build two vertically alligned cards
  } else if (Choice == 4) {
    return (
      <View>
        <Card
          style={[
            styles.ButtonSmall,
            {
              height: HeightBig,
              width: WidthBig,
              marginRight: margin,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              width: 170,
              marginRight: 80,
              marginBottom: 30,
            }}
          >
            <Card.Cover
              source={testfigure}
              style={[
                {
                  height: 60,
                  width: 60,
                  backgroundColor: "white",
                },
              ]}
            />
            <Text style={[styles.ButtonTextBig, { fontSize: SecondTextSize }]}>
              Total Amount of Task Today
            </Text>
          </View>
          <Card.Content>
            <Text style={[styles.ButtonTextBig, { marginBottom: 60 }]}>25</Text>
          </Card.Content>
        </Card>
        {
          //second button
        }
        <Card
          style={[
            styles.ButtonSmall,
            {
              height: HeightBig,
              width: WidthBig,
              marginTop: 10,
              marginRight: margin,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              width: 170,
              marginRight: 80,
              marginBottom: 30,
            }}
          >
            <Card.Cover
              source={testfigure2}
              style={[
                {
                  height: 60,
                  width: 60,
                  backgroundColor: "white",
                  marginVertical: 0,
                },
              ]}
            />
            <Text style={[styles.ButtonTextBig, { fontSize: SecondTextSize }]}>
              Total Amount of Task Today
            </Text>
          </View>
          <Card.Content>
            <Text style={[styles.ButtonTextBig, { marginBottom: 60 }]}>34</Text>
          </Card.Content>
        </Card>
      </View>
    );
  } else if (Choice == 5) {
    return (
      <View style={[styles.Button]}>
        <Image
          style={[
            styles.IconBigButton,
            { height: HeightIcon, width: WidthIcon },
          ]}
          source={testfigure}
        />

        <Text style={styles.SmallText}>{FirstText}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[styles.SmallText, { fontSize: 20, fontWeight: "bold" }]}
          >
            {ThirdText}
          </Text>
          <Text
            style={[styles.SmallText, { fontSize: 20, fontWeight: "bold" }]}
          >
            {FourthText}
          </Text>
        </View>
        <View style={styles.quantityButtonStyle}>
          <Text style={[styles.ButtonTextBig, { fontSize: SecondTextSize }]}>
            {SecondText}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader1: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  Button: {
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    width: 143,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 15,
    marginLeft: 3,
    marginRight: 3,
  },
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
  IconBigButton: {
    resizeMode: "contain",
    alignSelf: "baseline",
    marginLeft: 10,
    backgroundColor: "white",
  },
  ButtonTextBig: {
    fontSize: 55,
    fontWeight: "bold",
    alignSelf: "center",
  },
  SmallText: {
    fontSize: 15,
    marginBottom: 0,
  },
  IconButtonSmall: {
    height: 32,
    width: 30,
    marginRight: 80,
    marginBottom: 0,
    marginTop: 200,
  },
  ButtonTextSmall: {
    fontSize: 45,
    fontWeight: "bold",
  },
  ButtonSmall: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    width: 143,
    height: 115,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginTop: 0,
    marginLeft: 3,
    marginRight: 3,
  },
  cardstyle: {
    height: 90,
    width: 293,
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
  },
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
  },
  buttonGroup: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityButtonStyle: {
    backgroundColor: "#cccccc",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DashboardTables;
