import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../../components/UI/Button";
import CreateClient from "../../components/JobOrder/CreateOrder/CreateClient";
import CreateCar from "../../components/JobOrder/CreateOrder/CreateCar";
import ExistingClient from "../../components/JobOrder/CreateOrder/ExistingClient";
import ExistingCar from "../../components/JobOrder/CreateOrder/ExistingCar";
import RequestedService from "../../components/JobOrder/CreateOrder/RequestedService";
import { Colors } from "../../constants/colors";

function Create({ navigation }) {
  const [createPress, setCreatePress] = useState(false);
  const [existingPress, setExistingPress] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  const onNextPress = () => {
    return setPageCount(pageCount + 1);
  };

  const onBackPress = () => {
    if (pageCount === 1 && createPress === true) {
      return setPageCount(0), setCreatePress(!createPress);
    } else if (pageCount === 1 && existingPress === true) {
      return setPageCount(0), setExistingPress(!existingPress);
    }
    return setPageCount(pageCount - 1);
  };

  const onCreatePress = () => {
    return setCreatePress(!createPress), onNextPress();
  };
  const onExistingPress = () => {
    return setExistingPress(!existingPress), onNextPress();
  };

  const onCompletePress = () => {
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>ELECTRO COOL</Text>
        {
          //If createPress == true
          createPress === true ? (
            <View
              style={styles.createContainer}
              onStartShouldSetResponder={() => true}
            >
              {pageCount === 1 ? (
                <CreateClient />
              ) : pageCount === 2 ? (
                <CreateCar />
              ) : (
                <RequestedService />
              )}

              {pageCount === 3 ? (
                <View style={styles.backNextButtonContainer}>
                  <Button handler={onBackPress} style={styles.button}>
                    &#x276e; Back
                  </Button>
                  <Button handler={onCompletePress} style={styles.button}>
                    Complete
                  </Button>
                </View>
              ) : (
                <View style={styles.backNextButtonContainer}>
                  <Button handler={onBackPress} style={styles.button}>
                    &#x276e; Back
                  </Button>
                  <Button handler={onNextPress} style={styles.button}>
                    Next &#x276f;
                  </Button>
                </View>
              )}
            </View>
          ) : //Else if existingPress == true
          existingPress === true ? (
            <View style={styles.existingContainer}>
              <ExistingClient />
              <View style={styles.backNextButtonContainer}>
                <Button handler={onBackPress} style={styles.button}>
                  &#x3008; Back
                </Button>
                <Button style={styles.button}>Next &#x3009;</Button>
              </View>
            </View>
          ) : (
            //Else
            <View style={styles.buttonContainer}>
              <Button handler={onCreatePress} style={styles.button}>
                Create Client
              </Button>
              <Button handler={onExistingPress} style={styles.button}>
                Existing Client
              </Button>
            </View>
          )
        }
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 15,
    flex: 1,
    backgroundColor: Colors.whiteGrey,
    borderRadius: 15,
  },

  headingText: {
    marginLeft: 15,
    fontSize: 50,
    fontWeight: "bold",
  },

  buttonContainer: {
    display: "flex",
    marginTop: 250,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  createContainer: {
    flex: 1,
  },

  backNextButtonContainer: {
    display: "flex",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  existingContainer: {
    flex: 1,
  },

  button: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});

export default Create;
