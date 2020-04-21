const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

let League = require("./models/league.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

const api = express.Router();

app.use("/api", api);

api.route("/leagues").get(function (req, res) {
  League.find(function (err, leagues) {
    if (err) {
      console.log(err);
    } else {
      res.json(leagues);
    }
  });
});

api.route("/leagues/:id").get(function (req, res) {
  let id = req.params.id;
  League.findById(id, function (err, league) {
    res.json(league);
  });
});

api.route("/leagues/create").post(function (req, res) {
  let league = new League(req.body);
  league
    .save()
    .then((league) => {
      res.status(200).json({ league: "league created" });
    })
    .catch((err) => {
      res.status(400).send("server error");
    });
});
