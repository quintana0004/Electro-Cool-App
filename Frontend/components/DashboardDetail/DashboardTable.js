import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Figures from "../../constants/figures/Figures";
import { Avatar, Button, Card } from "react-native-paper";
function TheComponent({
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
}) {
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
        <Text style={styles.ButtonTextBig}>{SecondText}</Text>
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
          <Card.Content style={[{ flexDirection: "row" }]}>
            <Text variant="bodyMedium" style={[{ marginTop: 15 }]}>
              Miguelito El Heredero
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.ButtonSmall,
            { height: HeightBig, width: WidthBig, marginTop: 10 },
          ]}
        >
          <Card.Content style={[{ flexDirection: "row" }]}>
            <Text variant="bodyMedium" style={[{ marginTop: 15 }]}>
              {FirstText}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
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
        <Pressable onPress={() => console.log("Card pressed")}>
          <Card
            style={[
              styles.cardstyle,
              {
                height: 90,
                width: 293,
              },
            ]}
          >
            <Card.Content>
              <Text style={[{ marginLeft: 5 }]}>Invoice</Text>
              <Text style={[{ alignSelf: "flex-end" }]}>
                Cristobal Colon the Conqueror
              </Text>
            </Card.Content>

            <Card
              style={[
                {
                  width: 65,
                  marginLeft: 10,
                  backgroundColor: "#cccccc",
                },
              ]}
            >
              <Text style={[{ alignSelf: "center" }]}>#1234</Text>
            </Card>
          </Card>
        </Pressable>
        {
          //arreglar font size y verificar los styles a ver si todo esta en orden.
        }
      </View>
    );
  } else if (Choice == 4) {
    return (
      <View>
        <Card
          style={[
            styles.ButtonSmall,
            { height: HeightBig, width: WidthBig, marginRight: margin },
          ]}
        >
          <Card.Cover
            source={testfigure}
            style={[
              {
                height: 60,
                width: 90,
                backgroundColor: "white",
                alignSelf: "center",
              },
            ]}
          />

          <Card.Content>
            <Text style={[styles.ButtonTextBig]}>#1234</Text>
          </Card.Content>
        </Card>

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
          <Card.Cover
            source={testfigure}
            style={[
              {
                height: 60,
                width: 90,
                backgroundColor: "white",
                alignSelf: "center",
              },
            ]}
          />

          <Card.Content>
            <Text style={styles.ButtonTextBig}>#1234</Text>
          </Card.Content>
        </Card>
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
    marginRight: 65,
  },
  ButtonTextBig: {
    fontSize: 55,
    fontWeight: "bold",
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
});
export default TheComponent;
