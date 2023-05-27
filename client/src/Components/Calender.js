import React, { useState, useEffect } from "react";
import useFetch from "../CustomHooks/useFetch";

const Calendar = ({ newDataAdded }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, fetchData] = useFetch();
  useEffect(() => {
    fetchData("http://localhost:5005/api/formdata");
  }, [newDataAdded, fetchData]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
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

  if (!data) {
    if (!isLoaded) {
      return <div>...Chargement</div>;
    } else {
      return <div>Aucune donnée disponible</div>;
    }
  }

  return (
    <div className="h-full flex items-center justify-center ">
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {daysOfWeek.map((day) => (
              <th
                key={day}
                className="overflow-hidden max-w-[10vw] border-r border-l border-gray-300"
              >
                <div className="font-normal text-[14px]">{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
            <tr key={hour}>
              <td
                className="border-t border-gray-300 p-2 font-normal text-[14px]"
                style={{ width: "2vw", height: "6vh" }}
              >
                <div style={{ marginTop: "-4vh", marginLeft: "-5vw" }}>
                  {hour}:00
                </div>
              </td>
              {daysOfWeek.map((day, index) => {
                const appointments = data.filter(
                  (appt) =>
                    appt.date === day &&
                    `${hour.toString().padStart(2, "0")}00` <= appt.startTime &&
                    appt.startTime <
                      `${(hour + 1).toString().padStart(2, "0")}00`
                );

                return (
                  <td
                    key={index}
                    className="relative border border-gray-300 p-2 w-[10vw]"
                  >
                    {appointments.map((appointment, appIndex) => {
                      const slotHeight =
                        Math.round(
                          (appointment.endTime - appointment.startTime) / 50
                        ) * 50;

                      return (
                        <div
                          key={appIndex}
                          className={
                            "absolute inset-0 overflow-hidden w-[10vw] bg-sky-400 flex flex-col justify-center rounded-lg border border-gray-300"
                          }
                          style={{
                            height: `${(slotHeight * 6) / 100}vh`,
                            marginTop:
                              appointment.startTime % 100 !== 0 ? "3vh" : "0",
                          }}
                        >
                          <div className="text-[10px] text-white font-bold">
                            <p>{appointment.name}</p>
                            <p className="text-slate-600">{`${appointment.startTime.replace(
                              /(\d{2})(\d{2})/,
                              "$1h$2"
                            )} à ${appointment.endTime.replace(
                              /(\d{2})(\d{2})/,
                              "$1h$2"
                            )}`}</p>
                            <p>{appointment.motif}</p>
                          </div>
                        </div>
                      );
                    })}
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
