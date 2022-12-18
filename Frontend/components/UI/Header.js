import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

function Header({ children, divideH, divideW, colorHeader }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [sizing, setSizing] = useState({ windowWidth, windowHeight });

  useEffect(() => {
    const changes = Dimensions.addEventListener(
      "change",
      ({ windowWidth, windowHeight }) => {
        setSizing({ windowWidth, windowHeight });
      }
    );

    return () => changes?.remove();
  }, []);

  return (
    <View
      style={[
        {
          width: sizing.windowWidth / divideW,
          height: sizing.windowHeight / divideH,
          backgroundColor: colorHeader,
          right: divideW > 1 ? 40 : 0,
        },
        styles.header,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
  },
});

export default Header;
