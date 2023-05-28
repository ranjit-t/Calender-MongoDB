import React, { useState, useEffect } from "react";
import useFetch from "../CustomHooks/useFetch";

export default function AppointmentForm({
  setIsFormOpen,
  setNewDataAdded,
  newDataAdded,
}) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("Lundi");
  const [name, setName] = useState("");
  const [motif, setMotif] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [isSucessMessage, setIsSucessMessage] = useState(false);

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

  const [data, fetchData] = useFetch();
  useEffect(() => {
    fetchData("http://localhost:5005/api/formdata");
  }, [newDataAdded, fetchData]);

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
    // console.log(formData);

    if (!data) {
      setIsSucessMessage(false);
      setMessage("il y a un problème de connexion, essayez plus tard");
      return;
    }

    if (formData.startTime >= formData.endTime) {
      setIsSucessMessage(false);
      setMessage("veuillez vérifier les heures de début et de fin");
      return;
    }

    const filterData = data.filter(
      (apmt) =>
        apmt.date === formData.date &&
        ((formData.startTime >= apmt.startTime &&
          formData.startTime < apmt.endTime) ||
          (formData.endTime > apmt.startTime &&
            formData.endTime <= apmt.endTime) ||
          (formData.startTime <= apmt.startTime &&
            formData.endTime >= apmt.endTime))
    );

    if (filterData.length === 0) {
      // The appointment slot is free
      // console.log("Appointment can be added:", formData);
      setIsSucessMessage(true);
      setMessage("Votre rendez-vous est ajouté");

      fetch("http://localhost:5005/api/formdata ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Form data submitted:", data);

          setNewDataAdded((prev) => !prev);
          setIsSucessMessage(true);
          setMessage("Votre rendez-vous est ajouté");
          setTimeout(() => {
            setIsFormOpen(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setIsSucessMessage(false);
          setMessage("oups il y a une erreur");
        });
    } else {
      // The new appointment clashes with existing data
      // console.log("Appointment timing clashes with existing data");

      setIsSucessMessage(false);
      setMessage("ce créneau est déjà pris, choisissez d'autres horaires");
    }
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4">Ajouter un RDV</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m2">
          <label htmlFor="name" className="font-bold">
            Nom :
          </label>
          <input
            className=" rounded-md p-1 bg-neutral-200 mb-4"
            type="text"
            id="name"
            name="name"
            placeholder="Luke Skywalker"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
        </div>
        <div className="flex flex-col m2">
          <label htmlFor="motif" className="font-bold">
            Motif :
          </label>
          <input
            className="bg-neutral-200 rounded-md p-1 mb-4"
            type="text"
            id="motif"
            name="motif"
            placeholder="Première consultation"
            value={motif}
            onChange={(event) => {
              setMotif(event.target.value);
            }}
            required
          />
        </div>
        <div className="flex flex-col m2">
          <label htmlFor="description" className="font-bold">
            Description:
          </label>
          <textarea
            className="bg-neutral-200 rounded-md p-1 mb-4"
            id="description"
            name="description"
            placeholder="Je souhaite..."
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          ></textarea>
        </div>

        <div>
          <p className="font-bold  ">Jour</p>
          <div className="m-2 mb-8 bg-neutral-200 rounded-md">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                className={`day-button ${
                  date === day
                    ? "bg-sky-400 text-white p-2 rounded-md"
                    : "p-2 text-slate-500"
                }`}
                onClick={() => handleDayButtonClick(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Horaires</p>
          <label className="text-sky-400">Début:</label>
          <select
            className="border-collapse border border-slate-500 rounded-md p-1"
            value={startTime}
            onChange={(event) => {
              setStartTime(event.target.value);
            }}
          >
            <option value="">-- heure de début --</option>
            {[...Array(13)].map((_, index) => {
              const hour = index + 8;
              const paddedHour = hour.toString().padStart(2, "0");
              return (
                <React.Fragment key={hour}>
                  <option
                    value={`${paddedHour}:00`}
                  >{`${paddedHour}:00`}</option>
                  <option
                    value={`${paddedHour}:30`}
                  >{`${paddedHour}:30`}</option>
                </React.Fragment>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col m2">
          <label className="text-sky-400">Fin:</label>
          <select
            className="border-collapse border border-slate-500 rounded-md p-1"
            value={endTime}
            onChange={(event) => {
              setEndTime(event.target.value);
            }}
            required
          >
            <option value="">-- heure de fin --</option>
            {[...Array(13)].map((_, index) => {
              const hour = index + 8;
              const paddedHour = hour.toString().padStart(2, "0");
              return (
                <React.Fragment key={hour}>
                  <option
                    value={`${paddedHour}:00`}
                  >{`${paddedHour}:00`}</option>
                  <option
                    value={`${paddedHour}:30`}
                  >{`${paddedHour}:30`}</option>
                </React.Fragment>
              );
            })}
          </select>
        </div>
        <br />
        {message && (
          <p className={isSucessMessage ? "text-green-400" : "text-red-400"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className="border border-collapse mb-2 bg-sky-400 text-white  rounded-md px-2 hover:bg-sky-600"
        >
          Enregistrer
        </button>
      </form>
      <button
        className="border border-collapse bg-gray-100 font-bold  px-2 rounded-md hover:bg-gray-200 absolute -right-8 -top-8"
        onClick={() => {
          setIsFormOpen(false);
        }}
      >
        X
      </button>
    </div>
  );
}
