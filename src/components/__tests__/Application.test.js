import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")); //.then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    //});
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    //wait for Archie Cohen to be displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //select add on first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    //enter student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //save appointment
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //check to see if appointment was saved
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    //Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    //console.log(prettyDOM(day));
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change the student and change the Interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Check that the appointment was saved
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //puts in fake axios request
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Wait until the element with the "Add" button is displayed.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the student name into placeholder"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Error" is displayed
    await waitForElement(() => getByText(appointment, "Error"));

    // 8. Click on the Close button
    fireEvent.click(getByAltText(appointment, "Close"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    //puts in fake axios request
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Error" is displayed
    await waitForElement(() => getByText(appointment, "Error"));

    // 7. Click on the Close button
    fireEvent.click(getByAltText(appointment, "Close"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
