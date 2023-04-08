import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Figures from "../../constants/figures/Figures";

function Peneerecto({
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
      <View style={styles.Button}>
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
      <View
        style={[
          styles.ButtonSmall,
          { marginTop: MarginTableTop, marginRight: margin },
        ]}
      >
        <Image style={styles.IconButtonSmall} source={Figures.Wheel} />
        <Text style={styles.SmallText}>{FirstText}</Text>
        <Text style={styles.ButtonTextSmall}>{SecondText}</Text>

        <View
          style={[
            styles.ButtonSmall,
            { marginBottom: MarginTable, height: HeightSmallIcon },
          ]}
        >
          <Text style={styles.SmallText}>{ThirdText}</Text>
          <Text style={styles.ButtonTextSmall}>{FourthText}</Text>
        </View>
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
              marginTop: 5,
              marginRight: 10,
            },
          ]}
          source={Figures.CarsPendingConfirmation}
        />

        <Text style={[{ fontSize: 18, fontWeight: "600" }]}>{FirstText}</Text>

        <View style={[styles.Button, { height: HeightBig, width: WidthBig }]}>
          <Text style={styles.SmallText}>{SecondText}</Text>
        </View>
        {
          //arreglar font size y verificar los styles a ver si todo esta en orden.
        }
      </View>
    );
  } else if (Choice == 4) {
    return (
      <View style={[styles.ButtonHuge]}>
        <Text style={[{ fontSize: 22, fontWeight: "600" }]}>{FirstText}</Text>
        <Text style={[styles.ButtonTextBig, { fontSize: 80 }]}>
          {SecondText}
        </Text>

        <Text style={[{ fontSize: 22, fontWeight: "600" }]}>{FirstText}</Text>
        <Text style={[styles.ButtonTextBig, { fontSize: 80 }]}>
          {SecondText}
        </Text>
        {
          //arreglar font size y verificar los styles a ver si todo esta en orden.
        }
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
    height: 220,
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
    width: 290,
    height: 550,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 15,
    marginLeft: 0,
    marginRight: 3,
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
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 20,
    width: 143,
    height: 115,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
});
export default Peneerecto;
