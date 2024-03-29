import React, { useCallback, useState, useMemo } from "react";
import { StyleSheet, Text, View, Keyboard, Pressable } from "react-native";
import ClientCard from "../../components/UI/ClientCard";
import CarCard from "../../components/UI/CarCard";
import Appbar from "react-native-paper/src/components/Appbar";
import Colors from "../../constants/Colors/Colors";
import { StackActions } from "@react-navigation/native";
import {
  useCustomerInfoStore,
  useRequestedServiceStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";
import { TimePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "intl";
import "intl/locale-data/jsonp/en";
import AppointmentCard from "../../components/UI/AppointmentCard";
import { Button, Dialog, Portal } from "react-native-paper";
import DateforAppointmentCard from "../../components/UI/DateforAppointmentCard";
import { httpUpsertAppointments } from "../../api/appointments.api";
import { httpUpsertClient } from "../../api/clients.api";
import { httpUpsertCar } from "../../api/cars.api";
import { useCalendarStore } from "../../Store/calendarStore";
import { Calendar, CalendarUtils } from "react-native-calendars";

function CreateAppointments({ navigation }) {
  function goHomeAction() {
    //Added so when confirmed, go back to home page...
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  const client = useCustomerInfoStore((state) => {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      state: state.state,
      city: state.city,
      phone: state.phone,
      email: state.email,
    };
  });
  const car = useVehicleInfoStore((state) => {
    return {
      id: state.id,
      brand: state.brand,
      licensePlate: state.licensePlate,
      model: state.model,
      year: state.year,
      mileage: state.mileage,
      color: state.color,
      vinNumber: state.vinNumber,
      carHasItems: state.carHasItems,
      carItemsDescription: state.carItemsDescription,
      customerId: state.customerId,
    };
  });
  const schedule = useRequestedServiceStore((state) => {
    return {
      id: state.id,
      requestedService: state.requestedService,
      serviceDetails: state.serviceDetails,
      status: state.status,
      jobLoadType: state.jobLoadType,
      policySignature: state.policySignature,
      carId: state.carId,
      customerId: state.customerId,
    };
  });
  const service = useRequestedServiceStore((state) => {
    return {
      id: state.id,
      requestedService: state.requestedService,
      serviceDetails: state.serviceDetails,
      jobLoadType: state.jobLoadType,
      cardId: state.cardId,
      customerId: state.customerId,
    };
  });
  const [clientInfo] = useState({
    id: useCustomerInfoStore((state) => state.id),
    firstName: useCustomerInfoStore((state) => state.firstName),
    lastName: useCustomerInfoStore((state) => state.lastName),
    phone: useCustomerInfoStore((state) => state.phone),
    email: useCustomerInfoStore((state) => state.email),
  });
  const [carInfo] = useState({
    id: useVehicleInfoStore((state) => state.id),
    brand: useVehicleInfoStore((state) => state.brand),
    licensePlate: useVehicleInfoStore((state) => state.licensePlate),
    model: useVehicleInfoStore((state) => state.model),
    year: useVehicleInfoStore((state) => state.year),
    mileage: useVehicleInfoStore((state) => state.mileage),
    color: useVehicleInfoStore((state) => state.color),
    vinNumber: useVehicleInfoStore((state) => state.vinNumber),
    carHasItems: useVehicleInfoStore((state) => state.carHasItems),
    carItemsDescription: useVehicleInfoStore(
      (state) => state.carItemsDescription
    ),
    customerId: useVehicleInfoStore((state) => state.customerId),
  });
  const [appointmentInfo] = useState({
    id: useRequestedServiceStore((state) => state.id),
    requestedService: useRequestedServiceStore(
      (state) => state.requestedService
    ),
    serviceDetails: useRequestedServiceStore((state) => state.serviceDetails),
    status: useRequestedServiceStore((state) => state.status),
    jobLoadType: useRequestedServiceStore((state) => state.jobLoadType),
    carId: useVehicleInfoStore((state) => state.id),
    customerId: useCustomerInfoStore((state) => state.id),
  });
  const [serviceInfo] = useState(service);
  const [selected, setSelected] = useState(Date());
  const [dialogVisible3, setDialogVisible3] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = React.useState(false);
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [visibleErrorDialog, setVisibleErrorDialog] = useState(false);
  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);

  const setReloadCalendarList = useCalendarStore(
    (state) => state.setReloadCalendarList
  );

  async function handleSaveClient(clientInfo) {
    let response;

    try {
      response = await httpUpsertClient(clientInfo);
    } catch (error) {
      console.log("Error at Handle Save Client: ", error);
    }

    return response;
  }

  async function handleSaveCar(carInfo) {
    let response;

    try {
      response = await httpUpsertCar(carInfo);
    } catch (error) {
      console.log("Error at Handle Save Car: ", error);
    }

    return response;
  }

  async function handleSaveAppointment(appointmentInfo) {
    let response;

    try {
      response = await httpUpsertAppointments(appointmentInfo);
      setReloadCalendarList();
    } catch (error) {
      console.log("Error at Handle Save Appointment: ", error);
    }

    return response;
  }

  async function handleSave() {
    let customerInfoResponse;
    let carInfoResponse;
    let appointmentResponse;

    if (!clientInfo.id) {
      customerInfoResponse = {
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        phone: clientInfo.phone,
        email: clientInfo.email,
      };
    } else {
      customerInfoResponse = {
        id: clientInfo.id,
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        phone: clientInfo.phone,
        email: clientInfo.email,
      };
    }

    try {
      // Make the call for the API
      customerInfoResponse = await handleSaveClient(customerInfoResponse);

      //?When customer passes the value need their ID
      if (!carInfo.id) {
        carInfoResponse = {
          brand: carInfo.brand,
          licensePlate: carInfo.licensePlate,
          model: carInfo.model,
          year: carInfo.year,
          mileage: carInfo.mileage,
          color: carInfo.color,
          vinNumber: carInfo.vinNumber,
          carHasItems: carInfo.carHasItems === "Yes",
          carItemsDescription: carInfo.carItemsDescription,
          customerId: customerInfoResponse.data.id,
        };
      } else {
        carInfoResponse = {
          id: carInfo.id,
          brand: carInfo.brand,
          licensePlate: carInfo.licensePlate,
          model: carInfo.model,
          year: carInfo.year,
          mileage: carInfo.mileage,
          color: carInfo.color,
          vinNumber: carInfo.vinNumber,
          carHasItems: carInfo.carHasItems === "Yes",
          carItemsDescription: carInfo.carItemsDescription,
          customerId: customerInfoResponse.data.id,
        };
      }
      carInfoResponse = await handleSaveCar(carInfoResponse);

      //?When customer and car has been sent then need to create the Appointment
      const dateTime = new Date(date);
      dateTime.setHours(hour);
      dateTime.setMinutes(min);

      appointmentResponse = {
        service: appointmentInfo.requestedService,
        description: appointmentInfo.serviceDetails,
        model: carInfo.model,
        brand: carInfo.brand,
        year: carInfo.year,
        color: carInfo.color,
        licensePlate: carInfo.licensePlate,
        customerName: clientInfo.firstName + " " + clientInfo.lastName,
        phone: "7871231234",
        email: clientInfo.email,
        arrivalDateTime: dateTime,
      };

      appointmentResponse = await handleSaveAppointment(appointmentResponse);
    } catch (error) {
      console.log("Error at Handle Save: ", error);
    }
  }
  // End of the thing I dont undelstan
  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisibleTimePicker(false);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });

      setHour(hours);
      setMin(minutes);
    },
    [setVisibleTimePicker]
  );

  const onDismiss = useCallback(() => {
    setVisibleTimePicker(false);
    setOpen(false);
    const date = new Date();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    });
  }, [setOpen]);

  //Bryan Calendar's Stuff thing

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

  const DateTimeFormatter = () => {
    if (hour === undefined || min === undefined || date === undefined) {
      return "";
    } else {
      const dateTime = new Date(date);
      dateTime.setHours(hour);
      dateTime.setMinutes(min);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return dateTime.toLocaleString(undefined, options);
    }
  };

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigateBack();
          }}
        />
        <Appbar.Content title="Appointments"></Appbar.Content>
        <Appbar.Action
          icon="check-decagram"
          onPress={() => {
            if (date && hour) {
              setReloadCalendarList();
              setVisibleConfirmDialog(true);
            } else {
              setVisibleErrorDialog(true);
            }
          }}
          iconColor="black"
        />
      </Appbar.Header>
      {visibleErrorDialog && (
        <Portal>
          <Dialog
            visible={visibleErrorDialog}
            onDismiss={() => setVisibleErrorDialog(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="alert-circle-outline"
              size={80}
              color={Colors.darkRed}
            />
            <Dialog.Title style={styles.textAlert}>Invalid Inputs</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                There are missing required or need to correct information.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                textColor={Colors.yellowDark}
                onPress={() => setVisibleErrorDialog(false)}
              >
                Okay
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      {visibleConfirmDialog && (
        <Portal>
          <Dialog
            visible={visibleConfirmDialog}
            onDismiss={() => setVisibleConfirmDialog(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="check-circle-outline"
              size={80}
              color={Colors.darkGreen}
            />
            <Dialog.Title style={styles.textAlert}>
              Confirm Appointment
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                Is this the final statement of the Appointment?
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-between" }}>
              <Pressable
                onPress={async () => {
                  await handleSave();
                  setVisibleConfirmDialog(false);
                  goHomeAction();
                }}
              >
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>Confirm</Text>
                </View>
              </Pressable>

              <Pressable onPress={() => setVisibleConfirmDialog(false)}>
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>Cancel</Text>
                </View>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      <View style={styles.body}>
        <View style={styles.cardsContainer}>
          <View style={{ marginRight: 10 }}>
            <ClientCard client={clientInfo} />
          </View>
          <CarCard car={carInfo} />
        </View>

        <View style={styles.body}>
          <AppointmentCard service={serviceInfo} />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <View style={styles.container}>
            <View style={{ marginBottom: 20, width: 220 }}>
              <Button
                onPress={() => setDialogVisible3(true)}
                textColor="black"
                buttonColor="#99C1C1"
              >
                Select Date
              </Button>
            </View>
            {dialogVisible3 && (
              <Portal>
                <Dialog
                  visible={dialogVisible3}
                  onDismiss={() => setDialogVisible3(false)}
                  style={{ backgroundColor: Colors.white }}
                >
                  <Dialog.Icon
                    icon="calendar"
                    size={80}
                    color={Colors.darkGreen}
                  />
                  <Dialog.Title style={styles.textAlert}>
                    Select Date
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
                    <Pressable onPress={() => setDialogVisible3(false)}>
                      <View style={styles.confirmBtn}>
                        <Text style={styles.confirmText}>Select Date</Text>
                      </View>
                    </Pressable>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            )}
          </View>
          <View style={{ marginBottom: 20, width: 220 }}>
            <Button
              onPress={() => setVisibleTimePicker(true)}
              textColor="black"
              buttonColor="#99C1C1"
            >
              Select Time
            </Button>
          </View>

          <DateforAppointmentCard schedule={appointmentInfo} />
          <Text> {DateTimeFormatter(date, hour, min)}</Text>
        </View>

        <SafeAreaProvider>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TimePickerModal
              visible={visibleTimePicker}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              onCancel={onDismiss}
              is24Hour={false}
              mode="time"
            />
          </View>
        </SafeAreaProvider>
      </View>
    </View>
  );
}

export default CreateAppointments;

const styles = StyleSheet.create({
  body: {
    zIndex: -2,
    marginTop: 50,
  },
  header: {
    backgroundColor: Colors.yellowDark,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textAlert: {
    textAlign: "center",
  },
  container: {
    textColor: "black",
    buttonColor: "#99C1C1",
    borderRadius: 10,
  },
  calendar: {
    marginBottom: 10,
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
    marginTop: 20,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
