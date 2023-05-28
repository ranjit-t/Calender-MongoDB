const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5005;

const uri =
  "mongodb+srv://ranjiththota:ranjiththota@cluster0.t8lms3t.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//Creating a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  motif: String,
  description: String,
  date: String,
  startTime: String,
  endTime: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

//parsing JSON data
app.use(express.json());

app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.send("Hello, The server is up and running!");
});

// API endpoint to retrieve data
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

// API endpoint to post form data
app.post("/api/formdata", (req, res) => {
  const { name, motif, description, date, startTime, endTime } = req.body;

  const newFormData = new FormData({
    name,
    motif,
    description,
    date,
    startTime,
    endTime,
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

//Starting the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
