import React, { useEffect, useState } from "react";
import "./Calender.css";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const initialAppointments = [
      {
        title: "Appointment 1",
        start: "10h",
        end: "12h",
        day: "Monday",
      },
      {
        title: "Appointment 2",
        start: "12h",
        end: "14h",
        day: "Wednesday",
      },
      // Add more appointments as needed
    ];

    setAppointments(initialAppointments);
  }, []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
            <tr key={hour}>
              <td
                className="border-t border-gray-300 p-2"
                style={{ width: "2vw", height: "7vh" }}
              >
                <div style={{ marginTop: "-5vh", marginLeft: "-5vw" }}>
                  {hour}:00
                </div>
              </td>
              {daysOfWeek.map((day, index) => {
                const appointment = appointments.find(
                  (appt) => appt.day === day && appt.start === `${hour}h`
                );
                return (
                  <td
                    key={index}
                    className="border border-gray-300 p-2"
                    style={{ width: "10vw", position: "relative" }}
                  >
                    <div
                      className={appointment ? "appointment-slot" : ""}
                      style={DIVstyle}
                    >
                      {appointment ? appointment.title : ""}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
