import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AccountInformationForm from "../components/SignUp/AccountInformationForm";
import AccountCredentialsForm from "../components/SignUp/AccountCredentialsForm";
import AccountConfirmationDialog from "../components/SignUp/AccountConfirmationDialog";

function SignUp({ navigation }) {
  //Visibility of the pages
  const [page, setPage] = useState(0);

  //Visibility of confirm user account created
  const [visibilityAccountConfirm, setVisibilityAccountConfirm] =
    useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("LogIn")}
        style={{
          backgroundColor: "#CACACA",
          padding: 10,
          marginRight: 540,
          marginTop: 20,
          marginLeft: 10,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500" }}>
          Create an Account
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "200" }}>
          Let's get started creating an account!
        </Text>
      </View>
      {page === 0 && <AccountInformationForm setPage={setPage} />}
      {page === 1 && (
        <AccountCredentialsForm
          setVisibilityAccountConfirm={setVisibilityAccountConfirm}
        />
      )}
      {visibilityAccountConfirm && (
        <AccountConfirmationDialog
          visibilityAccountConfirm={visibilityAccountConfirm}
          setVisibilityAccountConfirm={setVisibilityAccountConfirm}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignUp;
