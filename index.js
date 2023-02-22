require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");

// initialise express
const app = express();

//  mondodb connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userTrackingSchema = new mongoose.Schema({
  username: String,
  id: String,
  punchIn: Date,
  punchOut: Date,
});

const UserTracking = mongoose.model("userTracking", userTrackingSchema);
const newUserData = new UserTracking({
  username: "ali",
  punchIn: Date.now(),
  punchOut: Date.now() + 100,
});
console.log(newUserData);
newUserData.save();

// get users
app.get("/", (req, res) => {
  UserTracking.find({}, function (err, data) {
    console.log(err, data, data.length);
    res.send(data);
  });
});

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));
