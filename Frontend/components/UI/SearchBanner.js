import React, { useState } from "react";
import { Banner } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors/Colors";

function SearchBanner({ visible, placeholder, loading, setLoading, setSearchTerm }) {
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
    <Banner visible={visible} style={styles.bannerSearch}>
      <View style={styles.container}>
        <Searchbar
          loading={loading}
          style={styles.searchbar}
          elevation={5}
          placeholder={placeholder}
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={onSearchIconPress}
          selectionColor={Colors.lightGrey}
        />
      </View>
    </Banner>
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
  bannerSearch: {
    backgroundColor: Colors.lightYellow,
  },
});

export default SearchBanner;
