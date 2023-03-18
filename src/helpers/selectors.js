export function getAppointmentsForDay(state, day) {
  const dayAppointment = state.days.find((days) => days.name === day);
  const appointmentsArray = dayAppointment ? dayAppointment.appointments.map(id => state.appointments[id]) : [];
  return appointmentsArray;
};

export function getInterviewersForDay(state, day) {
  const interviewersToday = state.days.find((days) => days.name === day);
  const interviewersArray = interviewersToday ? interviewersToday.interviewers.map(id => state.interviewers[id]) : [];
  return interviewersArray;
}

export function getInterview(state, interview) {
  const selectInterview = interview ? {student: interview.student, interviewer: state.interviewers[interview.interviewer]} : null;
  return selectInterview;
};



