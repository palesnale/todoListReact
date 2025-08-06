const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tasksRoute = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRoute);

mongoose.connect('mongodb://localhost:27017/taskApp');

module.exports = app;
