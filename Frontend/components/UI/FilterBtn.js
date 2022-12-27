import { View, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors/Colors";

function FilterBtn({ image }) {
  return (
    <View style={styles.filterButton}>
      <Image source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    width: 65,
    backgroundColor: Colors.yellowDark,
    borderRadius: 20,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FilterBtn;
