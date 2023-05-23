import React, { useEffect, useState } from "react";
import "./Calender.css";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const initialAppointments = [
      {
        Name: "Kevin",
        Motif: "Premier Consult",
        start: "1050",
        end: "1350",
        day: "Monday",
      },
      {
        Name: "Ram",
        start: "1200",
        end: "1400",
        day: "Wednesday",
      },
      {
        Name: "Sam",
        start: "1200",
        end: "1500",
        day: "Saturday",
      },
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

  return (
    <div className="h-full flex items-center justify-center">
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {daysOfWeek.map((day) => (
              <th key={day}>
                <div>{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
            <tr key={hour}>
              <td
                className="border-t border-gray-300 p-2"
                style={{ width: "2vw", height: "8vh" }}
              >
                <div style={{ marginTop: "-5vh", marginLeft: "-5vw" }}>
                  {hour}:00
                </div>
              </td>
              {daysOfWeek.map((day, index) => {
                const appointment = appointments.find(
                  (appt) =>
                    appt.day === day &&
                    `${hour}00` <= appt.start &&
                    appt.start < `${hour + 1}00`
                );
                return (
                  <td
                    key={index}
                    className="relative border border-gray-300 p-2 w-[10vw]"
                  >
                    <div
                      className={
                        appointment
                          ? "absolute inset-0 overflow-auto w-[10vw] bg-sky-400 flex flex-col justify-center rounded-lg"
                          : ""
                      }
                      style={{
                        height: `${
                          ((appointment?.end - appointment?.start) * 8) / 100
                        }vh`,
                        marginTop: appointment?.start % 100 !== 0 ? "4vh" : "0",
                      }}
                    >
                      <p>{appointment?.Name}</p>
                      <p>{appointment?.Motif}</p>
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
