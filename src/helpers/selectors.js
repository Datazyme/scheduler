//gets appointments for selected day called in Application.jsx
export function getAppointmentsForDay(state, day) {
  const dayAppointment = state.days.find((days) => days.name === day);
  const appointmentsArray = dayAppointment
    ? dayAppointment.appointments.map((id) => state.appointments[id])
    : [];
  return appointmentsArray;
}

//displays interviewers when appointment is selected called in Application.jsx
export function getInterviewersForDay(state, day) {
  const interviewersToday = state.days.find((days) => days.name === day);
  const interviewersArray = interviewersToday
    ? interviewersToday.interviewers.map((id) => state.interviewers[id])
    : [];
  return interviewersArray;
}

//sets interview with student and interviewer called in Application.jsx
export function getInterview(state, interview) {
  const selectInterview = interview
    ? {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
  return selectInterview;
}
