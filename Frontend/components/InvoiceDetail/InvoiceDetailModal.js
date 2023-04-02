import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import InvoiceDetailModalList from "./InvoiceDetailModalList";
import SearchBar from "../UI/SearchBar";
import { useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useDepositStore } from "../../Store/depositStore";

function InvoiceDetailModal({ visible, setVisibile }) {

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeposits, setSelectedDeposits] = useState([]);
  const setClientSelectedDeposits = useDepositStore((state) => state.setClientSelectedDeposits);

  function hideModal() {
    setVisibile(false);
  }

  function onSelectedDeposit(deposit) {
    selectedDeposits.push(deposit);
    setSelectedDeposits([...selectedDeposits]);
  }

  function onRemovedDeposit(deposit) {
    let filteredDeposits = selectedDeposits.filter(d => d.id != deposit.id);
    setSelectedDeposits([...filteredDeposits]);
  }

  function onApplyDeposits() {
    setClientSelectedDeposits(selectedDeposits);
    setSelectedDeposits([]);
    hideModal();
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
        <View>
          <View style={styles.modalHeader}>
            <SearchBar 
              placeholder={"Search deposit"} 
              loading={searchLoading} 
              setLoading={setSearchLoading} 
              setSearchTerm={setSearchTerm}
              searchBarStyles={styles.searchBar}
            />
            <View style={styles.sortBtn}>
              <Text style={styles.sortText}>
                Sort ASC
              </Text>
            </View>
          </View>
          <InvoiceDetailModalList 
            searchTerm={searchTerm} 
            searchLoading={searchLoading}
            setSearchLoading={setSearchLoading}
            onSelectedDeposit={onSelectedDeposit}
            onRemovedDeposit={onRemovedDeposit}
          /> 
          <View style={styles.modalFooter}>
            <Pressable onPress={hideModal}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </View>
            </Pressable>
            <Pressable onPress={onApplyDeposits}>
              <View style={styles.applyBtn}>
                <Text style={styles.applyText}>Apply Deposits</Text>
              </View>
            </Pressable>
          </View> 
        </View>
      </Modal>
    </Portal>
  );
}

export default InvoiceDetailModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    width: 310,
    marginVertical: 15,
    marginLeft: 10,
  },
  sortBtn: {
    height: 50,
    width: 150,
    padding: 10,
    marginRight: 10,
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
  },
  sortText: {
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 20,
    textAlign: "center"
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cancelBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(19, 138, 140, 0.25);",
    borderColor: Colors.brightGreen,
    borderWidth: 2,
    borderRadius: 15
  },
  cancelText: {
    color: Colors.brightGreen,
    fontWeight: "bold",
    fontSize: 18,
  },
  applyBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 15,
  },
  applyText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  }
});
