import React, { useState } from "react";

export default function AppointmentForm({ setNewForm }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("Lundi");
  const [name, setName] = useState("");
  const [motif, setMotif] = useState("");
  const [description, setDescription] = useState("");

  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const handleDayButtonClick = (day) => {
    setDate(day);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      motif: motif,
      description: description,
      date: date,
      startTime: startTime.replace(":", ""),
      endTime: endTime.replace(":", ""),
    };
    console.log(formData);
    fetch("http://localhost:5005/api/formdata ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form data submitted:", data);
        // Perform any additional actions after successful form submission
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        // Handle any error that occurred during form submission
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ajouter un RDV</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m2">
          <label htmlFor="name">Nom : </label>
          <input
            className=" rounded-md p-1 bg-neutral-200"
            type="text"
            id="name"
            name="name"
            placeholder="Nom"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
        </div>
        <div className="flex flex-col m2">
          <label htmlFor="motif">Motif : </label>
          <input
            className="bg-neutral-200 rounded-md p-1"
            type="text"
            id="motif"
            name="motif"
            placeholder="motif"
            value={motif}
            onChange={(event) => {
              setMotif(event.target.value);
            }}
            required
          />
        </div>
        <div className="flex flex-col m2">
          <label htmlFor="description">Description:</label>
          <textarea
            className="bg-neutral-200 rounded-md p-1"
            id="description"
            name="description"
            placeholder="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          ></textarea>
        </div>

        <div className="m-2 my-8 bg-neutral-200 rounded-md">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              type="button"
              className={`day-button ${
                date === day ? "bg-sky-400 text-white p-2 rounded-md" : "p-2"
              }`}
              onClick={() => handleDayButtonClick(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex flex-col m2">
          <label htmlFor="timeInput">Starting Time:</label>
          <select
            className="border-collapse border border-slate-500 rounded-md p-1"
            id="timeInput"
            value={startTime}
            onChange={(event) => {
              setStartTime(event.target.value);
            }}
          >
            <option value="">-- Select Time --</option>
            {[...Array(13)].map((_, index) => {
              const hour = index + 8;
              return (
                <React.Fragment key={hour}>
                  <option value={`${hour}:00`}>{`${hour}:00`}</option>
                  <option value={`${hour}:30`}>{`${hour}:30`}</option>
                </React.Fragment>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col m2">
          <label htmlFor="timeInput">Ending Time:</label>
          <select
            className="border-collapse border border-slate-500 rounded-md p-1"
            id="timeInput"
            value={endTime}
            onChange={(event) => {
              setEndTime(event.target.value);
            }}
          >
            <option value="">-- Select Time --</option>
            {[...Array(13)].map((_, index) => {
              const hour = index + 8;
              return (
                <React.Fragment key={hour}>
                  <option value={`${hour}:00`}>{`${hour}:00`}</option>
                  <option value={`${hour}:30`}>{`${hour}:30`}</option>
                </React.Fragment>
              );
            })}
          </select>
        </div>
        <br />
        <br />

        <button
          type="submit"
          className="border border-collapse mb-2 bg-emerald-700 text-white p-1 rounded-md w-32 hover:bg-emerald-900"
        >
          Ajouter
        </button>
      </form>
      <button
        className="border border-collapse bg-rose-500 text-white p-1 rounded-md hover:bg-rose-600"
        onClick={() => {
          setNewForm(false);
        }}
      >
        Annuler
      </button>
    </div>
  );
}
