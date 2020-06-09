const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FirstNameSchema = new Schema({

  Code: { type: String},
  Standardname: {type: String},
  Firstname: { type: String},

});

const Firstname = mongoose.model("Firstname", FirstNameSchema, "firstnames");

module.exports = Firstname;
