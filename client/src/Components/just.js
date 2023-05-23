import React, { useEffect, useState } from "react";
import "./Calender.css";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulated data for appointments
    const initialAppointments = [
      {
        title: "Appointment 1",
        start: new Date(2023, 4, 22, 10, 0, 0),
        end: new Date(2023, 4, 22, 12, 0, 0),
      },
      {
        title: "Appointment 2",
        start: new Date(2023, 4, 23, 14, 0, 0),
        end: new Date(2023, 4, 23, 16, 0, 0),
      },
      {
        title: "Appointment 3",
        start: new Date(2023, 4, 24, 9, 0, 0),
        end: new Date(2023, 4, 24, 10, 30, 0),
      },
      {
        title: "Appointment 4",
        start: new Date(2023, 4, 25, 10, 0, 0),
        end: new Date(2023, 4, 25, 12, 0, 0),
      },
    ];

    setAppointments(initialAppointments);
  }, []);

  // Helper function to generate time slots from 8 AM to 8 PM
  const generateTimeSlots = () => {
    const timeSlots = [];
    const startHour = 8;
    const endHour = 20;
    for (let hour = startHour; hour <= endHour; hour++) {
      timeSlots.push(`${hour}:00`);
    }
    return timeSlots;
  };

  // Helper function to get the appointment for a specific day and time slot
  const getAppointmentForTimeSlot = (day, timeSlot) => {
    const appointment = appointments.find(
      (appt) =>
        appt.start.getDay() === day &&
        appt.start.getHours().toString() === timeSlot.split(":")[0]
    );
    return appointment ? appointment.title : "";
  };

  let DIVstyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "auto",
  };

  return (
    <div className="h-full flex items-center justify-center">
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturnday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {generateTimeSlots().map((timeSlot) => (
            <tr key={timeSlot}>
              <td
                className="border-t border-gray-300 p-2"
                style={{ width: "2vw", height: "7vh" }}
              >
                <div style={{ marginTop: "-5vh", marginLeft: "-5vw" }}>
                  {timeSlot}
                </div>
              </td>
              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(1, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(1, timeSlot)}
                </div>
              </td>

              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(2, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(2, timeSlot)}
                </div>
              </td>
              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(3, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(3, timeSlot)}
                </div>
              </td>
              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(4, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(4, timeSlot)}
                </div>
              </td>
              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(5, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(5, timeSlot)}
                </div>
              </td>
              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(6, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(6, timeSlot)}
                </div>
              </td>
              <td
                className="border border-gray-300 p-2"
                style={{ width: "10vw", position: "relative" }}
              >
                <div
                  className={
                    getAppointmentForTimeSlot(6, timeSlot) === ""
                      ? ""
                      : "appointment-slot"
                  }
                  style={DIVstyle}
                >
                  {getAppointmentForTimeSlot(6, timeSlot)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
