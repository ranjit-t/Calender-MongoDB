// import { Calendar } from "fullcalendar";
// import { Calendar } from "fullcalendar";
import "./App.css";
import AppointmentForm from "./AppointmentForm";
import Calendar from "./Calender";

function App() {
  return (
    <div className="App flex flex-col">
      <h1>Allaw</h1>
      {/* <Calendar></Calendar> */}
      <Calendar></Calendar>
      <AppointmentForm></AppointmentForm>
    </div>
  );
}

export default App;
