const Surname = require("../models/surname.model");
const Firstname = require("../models/firstname.model");


exports.getsnamecode = function (req, res, next) {
  console.log("codetoname controller");
    let code = req.body.snameCode;
  console.log("Sname Here = " + code);

  Surname.find({ Ref1: code})
  .then((sname) => res.json(sname))
  .catch((err) => res.status(400).json(`Error: ${err}`));
  };

exports.getfnamecode = function (req, res, next) {
  console.log("codetoname controller");

    let code = req.body.fnameCode;
    console.log("Fname Here = " + code);
  
    Firstname.find({ Code: code})
    .then(function(name){
      console.log(name);
      res.json(name);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
  };