export function getAppointmentsForDay(state, day) {
  const dayAppointment = state.days.find((days) => days.name === day);
  console.log(dayAppointment)

  const appointmentsArray = dayAppointment ? dayAppointment.appointments.map(id => state.appointments[id]) : []

  return appointmentsArray;
};