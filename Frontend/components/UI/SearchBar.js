<<<<<<< HEAD
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
=======
import { useState } from "react";
import { View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { FontAwesome } from "@expo/vector-icons";

function SearchBar({ widthBar, heightBar, placeholderText, onSearch }) {
>>>>>>> 72a38d3ec87fd6bbc1244f3aff1df8d174453883
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
<<<<<<< HEAD
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
=======
          color={Colors.darkGrey}
          style={styles.icon}
          onPress={() => onSearch(searchValue)}
        />
      ) : (
        <ActivityIndicator size="large" color={Colors.yellowDark} style={styles.loading} />
>>>>>>> 72a38d3ec87fd6bbc1244f3aff1df8d174453883
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
