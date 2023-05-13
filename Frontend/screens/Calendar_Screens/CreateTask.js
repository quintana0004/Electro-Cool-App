import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Pressable,
  Dimensions,
  Keyboard,
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
import format from "date-fns/format";
import { StackActions, useNavigation } from "@react-navigation/native";
import TableItemCTasks from "../../components/CalendarDetail/TableItemCTasks";
import TableHeaderCTasks from "../../components/CalendarDetail/TableHeaderCTasks";
import { useCalendarStore } from "../../Store/calendarStore";
import { Calendar, CalendarUtils } from "react-native-calendars";

function cTaskItem(itemData) {
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
  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);
  const setReloadTaskList = useTaskStore((state) => state.setReloadTaskList);
  const clearAllTasks = useTaskStore((state) => state.clearAllTasks);
  const setReloadCalendarList = useCalendarStore(
    (state) => state.setReloadCalendarList
  );
  const [date, setDate] = useState(undefined);

  //Other Hooks
  const [selected, setSelected] = useState(Date());
  const [dialogVisible1, setDialogVisible1] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  const [dialogVisible3, setDialogVisible3] = useState(false);
  const ref = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
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

  function handleCreateTask() {
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
      id: generateKey(),
      text: text,
      dueDate: new Date(parsedDueDate),
    };

    addTask(task);
  }

  async function pushTask() {
    try {
      for (const items in tasks) {
        const beans = await httpCreateTask(tasks[items]);
        showSuccessMessage();
        setDialogVisible1(false);
        setDialogVisible2(true);
        clearAllTasks();
      }
    } catch (error) {
      showFailedMessage();
    }
  }

  function showSuccessMessage() {
    ToastAndroid.show("Task(s) created Successfully!", ToastAndroid.SHORT);
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
    let dateObj; //typeof date === "string" && date instanceof Date
    while (dateObj === undefined) {
      if (typeof date === "string") {
        dateObj = date;
      } else {
        return "";
      }
    }
    return format(new Date(dateObj), "MM/dd/yyyy");
  }

  //Calendar stuff

  const getDate = (count) => {
    const day = new Date();
    const newDate = day.setDate(day.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const marked = useMemo(() => {
    return {
      [getDate(-1)]: {
        marked: true,
        dotColor: Colors.darkGreen,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: Colors.darkGreen,
        selectedTextColor: "white",
      },
    };
  }, [selected]);

  const onDayPress = useCallback((dateObj) => {
    setSelected(dateObj.dateString);
    const newDateObj = dateObj.dateString + "T04:00:00.000Z";

    setDate(newDateObj);
  }, []);

  const todaysDate = new Date();
  const minDate = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth(),
    todaysDate.getDate()
  );
  const minDate1 = minDate.toISOString();

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
                onPress={() => {
                  setDialogVisible3(true);
                  Keyboard.dismiss();
                }}
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
      {dialogVisible1 && (
        <Portal>
          <Dialog
            visible={dialogVisible1}
            onDismiss={() => setDialogVisible1(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="alert-circle-outline"
              size={80}
              color={Colors.brightGreen}
            />
            <Dialog.Title style={styles.textAlert}>Confirm Tasks</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                Are you sure that you want to add the following tasks?
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
              <Button
                title="Cancel"
                color={Colors.yellowDark}
                onPress={() => setDialogVisible1(false)}
              ></Button>
              <Button
                title="Confirm"
                color={Colors.darkGreen}
                onPress={() => pushTask()}
              ></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      {dialogVisible2 && (
        <Portal>
          <Dialog
            visible={dialogVisible2}
            onDismiss={() => setDialogVisible2(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="check-circle-outline"
              size={80}
              color={Colors.darkGreen}
            />
            <Dialog.Title style={styles.textAlert}>
              Tasks Confirmed
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                The tasks were added! You can now proceed to the home page.
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
              <Button
                title="Done"
                color={Colors.brightGreen}
                onPress={() => {
                  setDialogVisible2(false);
                  navigation.navigate("CalendarMain");
                  setReloadCalendarList();
                }}
              ></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      {dialogVisible3 && (
        <Portal>
          <Dialog
            visible={dialogVisible3}
            onDismiss={() => setDialogVisible3(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon icon="calendar" size={80} color={Colors.darkGreen} />
            <Dialog.Title style={styles.textAlert}>
              Select Task Due Date:
            </Dialog.Title>
            <Dialog.Content>
              <Calendar
                enableSwipeMonths
                minDate={minDate1}
                current={Date()}
                style={styles.calendar}
                onDayPress={onDayPress}
                markedDates={marked}
                theme={{
                  todayTextColor: Colors.darkBlack,
                  arrowColor: Colors.darkGreen,
                }}
              />
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
              <Button
                title="Done"
                color={Colors.brightGreen}
                onPress={() => {
                  setDialogVisible3(false);
                }}
              ></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      <TableHeaderCTasks />
      <View style={{ height: 520 }}>
        <FlatList
          data={tasks}
          renderItem={cTaskItem}
          keyExtractor={(item) => {
            return item.id;
          }}
          style={{ flexGrow: 1 }}
        />
      </View>
      <View style={styles.box}>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.darkGreyAsh }]}
          onPress={async () => {
            clearAllTasks();
            setReloadTaskList();
          }}
        >
          <Text style={styles.buttonText}>Clear All</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.darkGreen }]}
          onPress={async () => {
            setDialogVisible1(true);
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
  textAlert: {
    textAlign: "center",
  },
  calendar: {
    marginBottom: 10,
  },
});

export default CreateTask;
