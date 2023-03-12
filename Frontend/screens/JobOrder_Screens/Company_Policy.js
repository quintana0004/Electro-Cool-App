import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";

import { Checkbox } from "react-native-paper";

function CompanyPolicy({ navigation }) {
  const [checked, setChecked] = useState("");

  const policy = [
    {
      id: 1,
      policy:
        "The company its not responsible of the objects left in the interior of the vehicle.",
    },
    {
      id: 2,
      policy:
        "The client accepts that in case of not paying the entire invoice for the repair of the vehicle, he will leave the same in deposit in the workshop until the total payment, if this is not done before fifteen (15) working days from completion of the works. Then ten dollars ($10.00) per day will be charged for parking in our facilities. When the car has been in storage for 90 days, the company will take possession of the vehicle as payment, this text being the only notice.",
    },
    {
      id: 3,
      policy:
        "In engine repairs, the client must pay half of the total workwhen it is indicated.",
    },
  ];

  function navNext() {
    navigation.navigate("CompanyPolicy");
  }

  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color="#FFFFFF"
        />
        <Appbar.Content title="Company Policy" color="#FFFFFF"></Appbar.Content>
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>
          Important information before signing contract
        </Text>
      </View>
      <View>
        <FlatList
          data={policy}
          renderItem={({ item }) => {
            return (
              <View style={{ marginVertical: 15, marginHorizontal: 30 }}>
                <Text style={{ fontSize: 20 }}>{`\u2022 ${item.policy}`}</Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 30,
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          I, agree to the company policy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkGreen,
  },
  instruction: {
    fontWeight: "800",
    color: Colors.black,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  containerKey: {
    flex: 1,
  },
  navBtnsPosition: {
    width: 540,
    height: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navCancelBtn: { marginRight: 10 },
  navNextBtn: { marginLeft: 10 },
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default CompanyPolicy;
