import { useState } from "react";
import "./App.css";
import AppointmentForm from "./AppointmentForm";
import Calendar from "./Calender";

function App() {
  const [newForm, setNewForm] = useState(false);
  return (
    <div className="App flex flex-col items-center m-8 relative">
      <h1 className="text-4xl mb-8">ALLAW - CALENDRIER</h1>
      <Calendar />
      <button
        className="border border-collapse m-8 bg-sky-400 text-white w-32 hover:bg-sky-600"
        onClick={() => {
          setNewForm((prev) => !prev);
        }}
      >
        Ajour RDV
      </button>
      {newForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4">
            <AppointmentForm setNewForm={setNewForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
