import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import {
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";

import {useQuery} from "@tanstack/react-query";
import {httpGetInvoice} from "../../api/invoices.api";
import CarsPendingConfirmation from "../Dashboard/CarsPendingConfirmation";

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
  const [invoiceId, setInvoiceId] = useState(1); // TODO: This is just a test id, please pass the id from the parent component
  const [invoiceItems, setInvoiceItems] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["DashboardInvoiceDetail", invoiceId],
    queryFn: fetchInvoiceData,
    enabled: !!invoiceId,
  });

  async function fetchInvoiceData() {
    const data = await httpGetInvoice(invoiceId);
    return data.data.invoiceItems;
  }

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
  } else if (Choice === 3) {
    return (
      <CarsPendingConfirmation />
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
