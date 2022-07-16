import { Input, Icon, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <View style={styles.container}>
      <Input
        type="text"
        h="70"
        w="800"
        variant="filled"
        placeholder="Search for client"
        rounded="100"
        borderColor={"warmGray.500"}
        InputLeftElement={
          <Icon as={<Ionicons name="search" />} size={10} ml="5" />
        }
        _input={{ fontSize: 25, fontWeight: "light" }}
        InputRightElement={
          <Button
            size={40}
            bgColor="yellow.500"
            variant="subtle"
            onPress={() => {
              onSearch(searchValue);
            }}
            _text={{ fontSize: 25, fontWeight: "bold", color: "black" }}
          >
            Search
          </Button>
        }
        value={searchValue}
        onChangeText={(search) => {
          setSearchValue(search);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginHorizontal: 60,
  },
});

export default SearchBar;
