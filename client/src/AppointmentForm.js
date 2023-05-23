import React, { useState } from "react";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    motive: "",
    description: "",
    date: "",
    starttime: "",
    endtime: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3005/api/formdata ", {
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
      <h1>Appointment Form</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="motive">Motive:</label>
        <input
          type="text"
          id="motive"
          name="motive"
          value={formData.motive}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <br />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="starttime">Start Time:</label>
        <input
          type="time"
          id="starttime"
          name="starttime"
          value={formData.starttime}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="endtime">End Time:</label>
        <input
          type="time"
          id="endtime"
          name="endtime"
          value={formData.endtime}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
