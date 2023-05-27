import React from "react";

export default function AppointmentDetails({
  currentAppointment,
  setshowAppointment,
}) {
  return (
    <div className="relative">
      <p className="m-2">
        <span className="font-bold">Nom : </span> {currentAppointment.name}{" "}
      </p>
      <p className="m-2">
        <span className="font-bold">RDV : </span>
        {`${currentAppointment.startTime.replace(
          /(\d{2})(\d{2})/,
          "$1h$2"
        )} à ${currentAppointment.endTime.replace(
          /(\d{2})(\d{2})/,
          "$1h$2"
        )} le ${currentAppointment.date}`}
      </p>
      <p className="m-2">
        <span className="font-bold">Motif : </span>
        {currentAppointment.motif}{" "}
      </p>
      <p className="m-2 max-w-[70vw]">
        <span className="font-bold">Description : </span>
        {currentAppointment.description}{" "}
      </p>
      <button
        className="border border-collapse bg-gray-100 font-bold  px-2 rounded-md hover:bg-gray-200 absolute -right-8 -top-10"
        onClick={() => {
          // setIsFormOpen(false);
          setshowAppointment(false);
        }}
      >
        X
      </button>
    </div>
  );
}
