import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../../constants/Colors/Colors";
import { format } from "date-fns";
import { Avatar } from "react-native-paper";
import { CBCustomerInfoStore } from "../../../Store/JobOrderStore";
import { StackActions, useNavigation } from "@react-navigation/native";

function TableItemClient({ id, firstName, lastName, date, phone, email }) {
  function DateText() {
    return format(new Date(date), "MM/dd/yyyy");
  }

  const setCBCustomerInfo = CBCustomerInfoStore(
    (state) => state.setCBCustomerInfo
  );

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        const pageAction = StackActions.push("ClientBookCustomer");
        navigation.dispatch(pageAction);
        setCBCustomerInfo(id, firstName, lastName, phone, email, date);
      }}
    >
      <View style={styles.content}>
        <View style={styles.groups}>
          <View>
            <Avatar.Text
              size={45}
              label={Array.from(firstName)[0] + Array.from(lastName)[0]}
              style={styles.circle}
            />
            <View style={styles.nameRec}>
              <Text style={styles.boldWhite}>
                {firstName} {lastName}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <View>
              <Avatar.Icon
                size={24}
                icon="calendar"
                style={{ backgroundColor: "#D9D9D9" }}
              />
            </View>
            <View>
              <Text style={styles.boldText}>Date Created:</Text>
            </View>
            <View>
              <Text style={styles.boldText}>{DateText()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.groups}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 25,
            }}
          >
            <View>
              <Avatar.Icon
                size={24}
                icon="phone"
                style={{ backgroundColor: "#D9D9D9", marginHorizontal: 10 }}
              />
            </View>
            <View>
              <Text style={styles.boldText}>Phone Number:</Text>
            </View>
            <View>
              <Text style={[styles.boldText, { marginHorizontal: 5 }]}>
                {phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 10,
              marginRight: 20,
              flexWrap: "wrap",
            }}
            numberOfLines={2}
          >
            <View>
              <Avatar.Icon
                size={24}
                icon="email"
                style={{ backgroundColor: "#D9D9D9", marginHorizontal: 10 }}
              />
            </View>
            <View>
              <Text style={styles.boldText}>Email:</Text>
            </View>
            <View>
              <Text style={[styles.boldText, { marginHorizontal: 5 }]}>
                {email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "space-between",
    marginHorizontal: 10,
    height: 115,
    borderRadius: 10,
    shadowColor: Colors.black,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "500",
    fontSize: 12,
  },
  circle: {
    backgroundColor: "#EFE2BF",
    marginTop: 10,
    marginHorizontal: 8,
    borderWidth: 0.5,
    borderColor: "#EFE2BF",
    marginBottom: 10,
    position: "absolute",
    zIndex: 1,
  },
  nameRec: {
    flexDirection: "column",
    marginTop: 15,
    height: 35,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.black,
    justifyContent: "space-evenly",
    marginRight: 5,
  },
  boldWhite: {
    fontWeight: "500",
    fontSize: 12,
    color: Colors.white,
    marginLeft: 60,
  },
  groups: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default TableItemClient;
