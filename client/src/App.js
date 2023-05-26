import { useState } from "react";
import "./App.css";
import AppointmentForm from "./Components/AppointmentForm";
import Calendar from "./Components/Calender";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newDataAdded, setNewDataAdded] = useState(false);

  return (
    <div className="App flex flex-col items-center m-8 relative">
      <h1 className="text-4xl mb-8">ALLAW - CALENDRIER</h1>
      <Calendar newDataAdded={newDataAdded} />
      <button
        className="border border-collapse m-8 bg-sky-400 text-white w-32 rounded-md hover:bg-sky-600 "
        onClick={() => {
          setIsFormOpen((prev) => !prev);
        }}
      >
        Ajour RDV
      </button>
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className="bg-white p-4 drop-shadow-lg rounded-lg p-8">
            <AppointmentForm
              setIsFormOpen={setIsFormOpen}
              setNewDataAdded={setNewDataAdded}
              newDataAdded={newDataAdded}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
