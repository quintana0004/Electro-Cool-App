import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ToastAndroid,
  Pressable,
  Dimensions,
} from "react-native";
import {
  Appbar,
  TextInput,
  HelperText,
  Avatar,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { Formik } from "formik";
import { useTaskStore } from "../../Store/taskStore";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { httpCreateTask } from "../../api/tasks.api";
import * as Yup from "yup";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "intl";
import "intl/locale-data/jsonp/en";
import intlFormat from "date-fns/intlFormat";
import format from "date-fns/format";
import { StackActions, useNavigation } from "@react-navigation/native";
import TableItemCTasks from "../../components/CalendarDetail/TableItemCTasks";
import TableHeaderCTasks from "../../components/CalendarDetail/TableHeaderCTasks";

function cTaskItem(itemData) {
  //console.log("ITEAM DATA: ", itemData);
  return (
    <TableItemCTasks
      id={itemData.item.id}
      text={itemData.item.text}
      dueDate={itemData.item.dueDate}
    />
  );
}

function CreateTask() {
  //Store Hooks
  const setTask = useTaskStore((state) => state.setTask);
  const id = useTaskStore((state) => state.id);
  const setReloadTaskList = useTaskStore((state) => state.setReloadTaskList);
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  //Other Hooks
  const [dialogVisible, setDialogVisible] = useState(false);
  const ref = useRef(null);
  const [taskData, setTaskData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const [initilizeData, setInitializeData] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  const ValidationTask = Yup.object().shape({
    text: Yup.string().required("A task is required."),
  });

  function errorHandler() {
    setErrorMessage(null);
  }

  if (errorMessage && !isFetching) {
    return <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />;
  }

  function DataRespondFormik() {
    let dataPassed;

    if (initilizeData) {
      dataPassed = {
        text: taskData.data.text,
        dueDate: taskData.data.dueDate,
      };
    } else {
      dataPassed = {
        text: "",
        dueDate: "",
      };
    }

    return dataPassed;
  }

  function generateKey() {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `key-${randomString}`;
  }

  async function handleCreateTask() {
    const text = ref.current.values.text;
    const dueDate = date;

    if (!text || !dueDate) {
      showFailedMessage();
      return null;
    }

    const parsedDueDate = Date.parse(dueDate);
    if (isNaN(parsedDueDate)) {
      showFailedMessage();
      return null;
    }

    const task = {
      key: generateKey(),
      text: text,
      dueDate: new Date(parsedDueDate),
    };

    taskData.push(task);
    setTaskData([...taskData]);

    return task.key;
  }

  async function popAllTasks() {
    for (const items in taskData) {
      console.log(taskData[items]);
      taskData.pop();
    }
  }

  async function pushTask() {
    try {
      for (const items in taskData) {
        console.log(taskData[items]);
        const beans = await httpCreateTask(taskData[items]);
        console.log(beans);
        showSuccessMessage();
      }
    } catch (error) {
      console.log("ERROR MESSAGE CLIENT: ", error);
      showFailedMessage();
    }
  }

  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
  }

  function showFailedMessage() {
    ToastAndroid.show("Try Again, there was a problem!", ToastAndroid.SHORT);
  }

  const navigation = useNavigation();

  function navPrevious() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  //Formats date
  function selectedDate() {
    let dateObj;
    while (dateObj === undefined) {
      if (typeof date === "object" && date instanceof Date) {
        dateObj = date;
      } else {
        return "";
      }
    }
    return format(new Date(dateObj), "MM/dd/yyyy");
  }

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navPrevious();
          }}
        />
        <Appbar.Content></Appbar.Content>
      </Appbar.Header>
      <SafeAreaProvider>
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <DatePickerModal
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
        </View>
      </SafeAreaProvider>
      <Formik
        initialValues={DataRespondFormik()}
        onSubmit={(values) => console.log(values)}
        validationSchema={ValidationTask}
        innerRef={ref}
        enableReinitialize={initilizeData}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <View style={styles.content}>
            <View style={styles.container}>
              <TextInput
                label="Task"
                mode="outlined"
                outlineColor={Colors.darkGrey}
                activeOutlineColor={Colors.brightGreen}
                keyboardType="default"
                onChangeText={handleChange("text")}
                onBlur={handleBlur("text")}
                value={values.text}
                error={touched.text && errors.text}
                style={styles.textInputStyle}
                disabled={disableInput}
              />
              <HelperText
                type="error"
                visible={!!(touched.text && errors.text)}
              >
                {errors.text}
              </HelperText>
            </View>
            <View style={styles.container2}>
              <Button
                title="Set Due Date"
                onPress={() => setOpen(true)}
                color={Colors.darkGreyAsh}
              />
              <Text>Date selected: {selectedDate()}</Text>
            </View>
            <Pressable
              onPress={async () => {
                handleCreateTask();
                setReloadTaskList();
              }}
            >
              <Avatar.Icon
                size={48}
                icon="plus"
                style={{ backgroundColor: Colors.darkGreen, marginTop: 30 }}
              />
            </Pressable>
          </View>
        )}
      </Formik>
      <TableHeaderCTasks />
      <View style={{ height: 520 }}>
        <FlatList
          data={taskData}
          renderItem={cTaskItem}
          keyExtractor={(item) => item.key}
          style={{ flexGrow: 1 }}
        />
      </View>
      <View style={styles.box}>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.darkGreyAsh }]}
          onPress={async () => {
            console.log("-w-");
            popAllTasks();
            setReloadTaskList();
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.darkGreen }]}
          onPress={async () => {
            console.log("UwU");
            pushTask();
            setReloadTaskList();
          }}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: -4,
    marginTop: 25,
    marginLeft: 15,
    margin: 17,
    borderRadius: 30,
    width: 220,
  },
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.yellowDark,
  },
  content: {
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "center",
    marginHorizontal: 10,
    height: 115,
    borderRadius: 10,
    shadowColor: Colors.black,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
    marginTop: 25,
    backgroundColor: "#D9D9D9",
    zIndex: -4,
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    fontSize: 16,
  },
  container2: {
    flexDirection: "column",
    zIndex: -4,
    marginTop: 37,
    marginLeft: 15,
    margin: 17,
    borderRadius: 30,
    width: 220,
  },
  box: {
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 10,
    height: 60,
    borderRadius: 10,
    shadowColor: Colors.black,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
    marginTop: 25,
    backgroundColor: "#D9D9D9",
    zIndex: -4,
  },
  button: {
    backgroundColor: Colors.darkGreen,
    borderRadius: 10,
    width: 120,
    height: 50,
    padding: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CreateTask;
