import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, Text, Button, Divider } from "native-base";
import BtnIcon from "../UI/BtnIcon";
function Filter({ onFilter }) {
  const [showModal, setShowModal] = useState(false);
  const [typeJobOrder, setTypeJobOrder] = useState([]);
  const [levelJobOrder, setLevelJobOrder] = useState([]);

  function onSave() {
    onFilter(typeJobOrder, levelJobOrder);
  }

  function onReset() {
    setLevelJobOrder([]);
    setTypeJobOrder([]);
    onFilter(typeJobOrder, levelJobOrder);
  }

  return (
    <View>
      <View style={styles.container}>
        <BtnIcon
          handler={() => setShowModal(!showModal)}
          name="filter"
          size={45}
          color="black"
        >
          Filter
        </BtnIcon>
      </View>
      {showModal && (
        <View style={styles.modal}>
          <Text fontSize="md" color="black" fontWeight="semibold" mb={2}>
            Choose a type of Job Order:
          </Text>
          <Checkbox.Group onChange={setTypeJobOrder} value={typeJobOrder}>
            <Checkbox value="New" bgColor="yellow.500" size="lg" my="1">
              New
            </Checkbox>
            <Checkbox value="Complete" bgColor="yellow.500" size="lg" my="1">
              Complete
            </Checkbox>
            <Checkbox value="Working" bgColor="yellow.500" size="lg" my="1">
              Working
            </Checkbox>
            <Checkbox value="Canceled" bgColor="yellow.500" size="lg" my="1">
              Canceled
            </Checkbox>
          </Checkbox.Group>
          <Divider my={2} />
          <Text fontSize="md" color="black" fontWeight="semibold" mb={2}>
            Choose level of Job Order:
          </Text>
          <Checkbox.Group onChange={setLevelJobOrder} value={levelJobOrder}>
            <Checkbox value="Heavy" bgColor="yellow.500" size="lg" my="1">
              Heavy
            </Checkbox>
            <Checkbox value="Light" bgColor="yellow.500" size="lg" my="1">
              Light
            </Checkbox>
          </Checkbox.Group>
          <Divider my={1} />
          <View style={styles.btns}>
            <View style={styles.btn}>
              <Button
                size="lg"
                variant="solid"
                width={100}
                bgColor="yellow.500"
                _text={{ color: "black", fontWeight: "bold" }}
                onPress={onSave}
              >
                Save
              </Button>
            </View>
            <View style={styles.btn}>
              <Button
                size="lg"
                variant="solid"
                width={100}
                bgColor="yellow.500"
                _text={{ color: "black", fontWeight: "bold" }}
                onPress={onReset}
              >
                Reset
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  modal: {
    marginTop: 12,
    width: 230,
    height: 390,
    borderColor: "black",
    borderWidth: 0.1,
    padding: 10,
    right: 5,
    borderRadius: 1,
    position: "absolute",
    top: 110,
    backgroundColor: "white",
    zIndex: 1,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    marginHorizontal: 1,
  },
});
export default Filter;
