const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let League = new Schema({
  leagueName: {
    type: String,
  },
});

module.exports = mongoose.model("League", League);
