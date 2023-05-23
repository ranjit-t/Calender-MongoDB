const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connection URL
// Connection URL
const uri =
  "mongodb+srv://ranjiththota:ranjiththota@cluster0.t8lms3t.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Create a schema and model for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  motive: String,
  description: String,
  date: Date,
  starttime: String,
  endtime: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

// Middleware to parse JSON data
app.use(express.json());

// API endpoint to retrieve form data
app.get("/api/formdata", (req, res) => {
  FormData.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error retrieving form data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// API endpoint to receive form data
app.post("/api/formdata", (req, res) => {
  const { name, motive, description, date, starttime, endtime } = req.body;

  const newFormData = new FormData({
    name,
    motive,
    description,
    date,
    starttime,
    endtime,
  });

  newFormData
    .save()
    .then((savedData) => {
      res.status(201).json(savedData);
    })
    .catch((error) => {
      console.error("Error saving form data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
