import { View, StyleSheet, Image } from "react-native";

function LoadingOverlay({}) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/8959-car-revolving-animation.gif")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});

export default LoadingOverlay;
