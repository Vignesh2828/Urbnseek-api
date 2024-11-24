const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/users.route.js")
const serviceRoute = require("./routes/services.route.js")
const reviewRoute = require("./routes/review.route.js")
const reportRoute = require("./routes/report.route.js")
const eventRoute = require("./routes/event.route.js")
const app = express();
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRoute);
app.use("/api/services", serviceRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/reports", reportRoute);
app.use("/api/events", eventRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Local MongoDB connection string
mongoose
  .connect('mongodb://localhost:27017/urbnseek')
  .then(() => {
    console.log("Connected to local database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });