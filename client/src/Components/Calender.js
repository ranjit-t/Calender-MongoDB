import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const initialAppointments = [
      {
        Name: "Kevin",
        Motif: "Premier Consult",
        start: "1050",
        end: "1450",
        day: "Lundi",
      },
      {
        Name: "Kevin",
        Motif: "Premier Consult",
        start: "1650",
        end: "1800",
        day: "Lundi",
      },
      {
        Name: "Ram",
        start: "1200",
        end: "1400",
        day: "Mercredi",
      },
      {
        Name: "Sam",
        start: "1200",
        end: "1500",
        day: "Samedi",
      },
    ];

    setAppointments(initialAppointments);
  }, []);

  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <div className="h-full flex items-center justify-center">
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {daysOfWeek.map((day) => (
              <th key={day} className="overflow-hidden max-w-[10vw]">
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
                style={{ width: "2vw", height: "6vh" }}
              >
                <div style={{ marginTop: "-4vh", marginLeft: "-5vw" }}>
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
                          ? "absolute inset-0 overflow-hidden w-[10vw] bg-sky-400 flex flex-col justify-center rounded-lg"
                          : ""
                      }
                      style={{
                        height: `${
                          ((appointment?.end - appointment?.start) * 6) / 100
                        }vh`,
                        marginTop: appointment?.start % 100 !== 0 ? "3vh" : "0",
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
