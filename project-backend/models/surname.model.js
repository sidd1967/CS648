const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const SurNameSchema = new Schema({

  Surname: { type: String},
  code: { type: String},
});

const Surname = mongoose.model("Surname", SurNameSchema, "surname");

module.exports = Surname;
