import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Colors from "../../constants/Colors/Colors";
import { HelperText, Modal, Portal, TextInput } from "react-native-paper";
import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { httpRequestRecoveryPassword } from "../../api/auth.api";

const validatorUser = Yup.object().shape({
  username: Yup.string().required("Requires Email or Username."),
});

function RecoveryPasswordModal({
  visible,
  setVisible,
  setSuccessDialogVisible,
  setErrorDialogVisible,
  setErrorMSG,
}) {
  const userInfoRef = useRef(null);

  function hideModal() {
    setVisible(false);
  }

  function handleInputValidation() {
    const TouchedObject = Object.keys(userInfoRef.current.touched).length > 0;

    if (
      !userInfoRef.current &&
      !userInfoRef.current.isValid &&
      !TouchedObject
    ) {
      return false;
    }

    return true;
  }

  async function onRecoveryPasswordRequest() {
    const isInputValid = handleInputValidation();
    if (isInputValid === false) return;

    const response = await httpRequestRecoveryPassword(
      userInfoRef.current.values.username
    );

    if (response.hasError) {
      setVisible(false);
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
    }

    setSuccessDialogVisible(true);
    setVisible(false);
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        <View>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>Send Password Recovery</Text>
            <Text style={styles.subHeaderText}>
              Please enter the email or username related to your account. We
              will send a recovery password email to your inbox for you to
              access your account.
            </Text>
          </View>
          <View style={styles.modalBody}>
            <Formik
              initialValues={{
                username: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validatorUser}
              innerRef={userInfoRef}
            >
              {({ handleChange, handleBlur, values, errors, touched }) => (
                <KeyboardAvoidingView
                  behavior="padding"
                  enabled
                  keyboardVerticalOffset={-100}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        mode="outlined"
                        label="Username"
                        outlineColor={Colors.darkGrey}
                        activeOutlineColor="#222831"
                        keyboardType="default"
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                        error={touched.username && errors.username}
                        style={styles.textInputStyle}
                        right={
                          <TextInput.Icon
                            icon="account-circle"
                            color={Colors.lightGreyDark}
                          />
                        }
                      />
                      <HelperText
                        type="error"
                        visible={!!(touched.username && errors.username)}
                      >
                        {errors.username}
                      </HelperText>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              )}
            </Formik>
          </View>

          <View style={styles.modalFooter}>
            <Pressable onPress={hideModal}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </View>
            </Pressable>
            <Pressable onPress={onRecoveryPasswordRequest}>
              <View style={styles.confirmBtn}>
                <Text style={styles.confirmText}>Confirm</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default RecoveryPasswordModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 30,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalBody: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  inputContainer: {
    width: 300,
    marginTop: 30,
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(19, 138, 140, 0.25);",
    borderColor: Colors.brightGreen,
    borderWidth: 2,
    borderRadius: 15,
  },
  cancelText: {
    color: Colors.brightGreen,
    fontWeight: "bold",
    fontSize: 18,
  },
  confirmBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 15,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
