const Surname = require("../models/surname.model");
const Firstname = require("../models/firstname.model");



exports.getall_snames = function (req, res, next) {
    Surname.find({}).select('Surname -_id')
  .then((allsnames) => res.json(allsnames))
  .catch((err) => res.status(400).json(`Error: ${err}`));
  };


exports.getall_fnames = function (req, res, next) {
    Firstname.find({}, {Firstname: 1, _id: 0})
  .then((allfnames) => res.json(allfnames))
  .catch((err) => res.status(400).json(`Error: ${err}`));
  };