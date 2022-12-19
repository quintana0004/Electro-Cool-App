import react, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors/Colors";
import { FontAwesome } from "@expo/vector-icons";

function SearchBar({ widthBar, heightBar, placeholderText, onData }) {
  // Info states needed for each search
  const [searchValue, setSearchValue] = useState();
  const [searching, setSearching] = useState(true);

  return (
    <View style={[{ width: widthBar, height: heightBar }, styles.container]}>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor="#595959"
        onChangeText={setSearchValue}
        value={searchValue}
        style={styles.Input}
      />
      {searching ? (
        <FontAwesome
          name="search"
          size={30}
          color="#898A8B"
          style={styles.icon}
          onPress={() => onData(searchValue)}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color={Colors.yellowDark}
          style={styles.loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Input: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "400",
  },
  icon: {
    marginRight: 20,
    marginBottom: 5,
  },
  loading: {
    marginRight: 15,
  },
});

export default SearchBar;
