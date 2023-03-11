import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { ErrorMessage, Formik } from "formik";
import {
  TextInput,
  HelperText,
  RadioButton,
  Checkbox,
} from "react-native-paper";
import * as Yup from "yup";
import NavBtn from "../../components/UI/NavBtns";

function CompanyPolicy({ navigation }) {
  const [checked, setChecked] = useState("No");
  const [height, setHeight] = useState(undefined);

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
        />
        <Appbar.Content title="Requested Service"></Appbar.Content>
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>
          View the select requested service for the vehicle
        </Text>
      </View>
      <View>
        <Text>
          The company its not responsible of the objects left in the interior of
          the car
        </Text>
        <Text>
          The client accepts that in case of not paying the entire invoice for
          the repair of the vehicle, he will leave the same in deposit in the
          workshop until the total payment, if this is not done before fifteen
          (15) working days from completion of the works. Then ten dollars
          ($10.00) per day will be charged for parking in our facilities. When
          the car has been in storage for 90 days, the company will take
          possession of the vehicle as payment, this text being the only notice.
        </Text>
        <Text>
          In engine repairs, the client must pay half of the total work when it
          is indicated.
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
    fontWeight: "400",
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
    backgroundColor: Colors.yellowDark,
  },
});

export default CompanyPolicy;
