// --- React Native ---
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// --- Components Created for this screen ---
import { Colors } from "../../constants/colors";
import Filter from "../../components/UI/Filter";
import BackButton from "../../components/UI/BackButton";
import SearchBar from "../../components/UI/SearchBar";
import JobList from "../../components/UI/JobList";
import LazyLoader from "../../components/UI/LazyLoader";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

// --- Data Files ---
import Clients from "../../constants/dummy-data/view-dummy";
import { useJobOrder } from "../../store/joborder-zustand";

function Views() {
  // --- Navigation ---
  const navigation = useNavigation();

  function goBackHandler() {
    return navigation.goBack();
  }

  // --- Zustand ---
  const setJobOrder = useJobOrder((state) => state.setJobOrder);
  const jobOrder = useJobOrder((state) => state.jobOrder);

  // --- Check the data ---
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    async function getJobOrders() {
      try {
        //--- Place Function to Backend ---
        setJobOrder(Clients);
        setData(Clients);
      } catch (error) {
        setError("Could not fetch the JobOrders.");
      }

      setIsFetching(false);
    }

    getJobOrders();
  }, []);

  function errorHandler() {
    return setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  // place here if isFetching
  if (isFetching) {
    return <LazyLoader />;
  }

  function filterJobOrder(typeJobOrder, levelJobOrder) {
    console.log("Type: ", typeJobOrder);
    console.log("Level: ", levelJobOrder);

    if (typeJobOrder.length === 0 && levelJobOrder.length === 0) {
      setData(jobOrder);
      return;
    }

    // --- Check the status needed to Filter ---
    function checkType(value) {
      for (const types of typeJobOrder) {
        if (value.JobOrderStatus === types) {
          return true;
        }
      }

      return false;
    }

    let result = data.filter(checkType);
    console.log("Result of the Status: ", result);

    // --- Check the level needed to Filter ---
    function checkLevel(value) {
      for (const level of levelJobOrder) {
        if (value.levelJobOrder === level) {
          return true;
        }
      }

      return false;
    }

    let finalResult = result.filter(checkLevel);
    setData(finalResult);
  }

  function searchJobOrder(search) {}

  return (
    <View style={styles.constainer}>
      <View style={styles.contain}>
        <View style={styles.header}>
          <BackButton handler={goBackHandler} />
          <SearchBar onSearch={searchJobOrder} />
          <Filter onFilter={filterJobOrder} />
        </View>
        <View style={styles.headerList}>
          <Text style={styles.jbID}>Job Order ID</Text>
          <Text style={styles.jbName}> Customer Name</Text>
          <Text style={styles.jbDate}>Entry Date</Text>
          <Text style={styles.jbStatus}>Status</Text>
        </View>
        <View style={styles.list}>
          <JobList JobOrderInfo={data} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  contain: {
    flex: 1,
    marginLeft: 115,
  },
  list: {
    marginTop: 5,
    paddingHorizontal: 24,
    paddingTop: 1,
    paddingBottom: 160,
  },
  headerList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    marginHorizontal: 35,
    marginTop: 15,
  },
  jbID: { marginRight: 150, marginLeft: 15, fontSize: 20, fontWeight: "500" },
  jbDate: {
    marginLeft: 100,
    marginRight: 260,
    fontSize: 20,
    fontWeight: "500",
  },
  jbName: { marginRight: 150, marginLeft: 50, fontSize: 20, fontWeight: "500" },
  jbStatus: { marginRight: 265, fontSize: 20, fontWeight: "500" },
});

export default Views;
