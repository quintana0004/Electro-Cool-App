import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors/Colors";

function SearchBar({ placeholder, loading, setLoading, setSearchTerm, searchBarStyles }) {
  //Search Query of the information
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onSearchIconPress = () => {
    setSearchTerm(searchQuery);
    setLoading(true);
  };

  return (
    <View style={[styles.container, searchBarStyles]}>
      <Searchbar
        loading={loading}
        style={styles.searchbar}
        placeholder={placeholder}
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={onSearchIconPress}
        selectionColor={Colors.lightGrey}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    color: Colors.black,
  },
  container: {
    width: 568,
  },
});

export default SearchBar;
