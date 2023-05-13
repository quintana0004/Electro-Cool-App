import axios from "./axios";

async function httpGetAllAppointments(searchTerm) {
  const queryParams = `?&searchTerm=${searchTerm}`;
  const response = await axios("/appointments" + queryParams);
  return response;
}
async function httpGetAppointmentbyId(id) {
  const response = await axios(`/appointments/${id}`);
  return response;
}
//?Client Information must be an object
async function httpUpsertAppointments(appointmentInfo) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/appointments", appointmentInfo);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    responseToReturn.hasError = true;
    responseToReturn.errorMessage = errorResponse.error.errorMessage;
  }
  return responseToReturn;
}

//?Delete Appointment for the date
async function httpDeleteAppointment(AppointmentId) {
  const response = await axios.delete(`/appointments/${AppointmentId}`);
  return response;
}

export {
  httpGetAllAppointments,
  httpUpsertAppointments,
  httpGetAppointmentbyId,
  httpDeleteAppointment,
};
