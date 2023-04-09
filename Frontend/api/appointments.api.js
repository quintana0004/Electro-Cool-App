import axios from "./axios";

async function httpGetAllAppointments(take, page, searchTerm = "") {
  const queryParams = `?take=${take}&page=${page}&searchTerm=${searchTerm}`;
  const response = await axios("/appointments" + queryParams);
  return response;
}
async function httpGetAppointmentbyId(id) {
  const response = await axios(`/appointments/${id}`);
  return response;
}
//?Client Information must be an object
async function httpUpsertAppointments(appointmentInfo) {
  const response = await axios.post("/appointments", appointmentInfo);
  return response;
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
