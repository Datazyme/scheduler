# **Interview Scheduler**

A single-page app built with React.js which allows users to book interviews. Each day of the week has one hour interview slots. The user can select an interview time and select an interviewer. The user can also delete and edit a booked interview.

# Screen Shots

!["Booked appointment"](https://github.com/Datazyme/scheduler/blob/master/screenShots/Booked%20Appointment.png)

!["Booking appointment"](https://github.com/Datazyme/scheduler/blob/master/screenShots/Booking%20Appointment.png)

!["Deleting appointment"](https://github.com/Datazyme/scheduler/blob/master/screenShots/Delete%20Appointment.png)

## Setup to run locally

1. Fork or clone scheduler and scheduler-api
2. Install dependencies with `npm install`
3. Additional dependencies

- react 16.9.0
- axios
- @testing-library/react-hooks
- react-test-renderer (`npm install --save-dev react-test-renderer@^16.9.0`)
- storybook

4. Run both scheduler and scheduler-api from different terminal windows with `npm start`
5. Run storybook with `npm run storybook`
6. Run Jest Tests with `npm test`
