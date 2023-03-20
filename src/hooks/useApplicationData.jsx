import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  //used to set the current day
  const setDay = (day) => setState({ ...state, day });

  //fetching data from scheduler-api
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //calculates spots remaining, called in then of booking and cancelling
  const spotsRemaining = (id, spots) => {
    const daysArr = [...state.days];
    daysArr.map(function (day) {
      for (let appointment of day.appointments) {
        if (appointment === id) {
          day.spots += spots;
        }
      }
      return day.spots;
    });
    return daysArr;
  };

  //bookInterview action makes an HTTP request and updates the local state
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    //const days = updateSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      spotsRemaining(id, -1);
      setState((prev) => ({ ...prev, appointments }));
    });
  };

  //cancelInterview action makes an HTTP request and updates the local state
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    //const days = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      spotsRemaining(id, 1);
      setState((prev) => ({ ...prev, appointments }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
