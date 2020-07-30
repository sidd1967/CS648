const Surname = require("./../models/surname.model");
const Firstname = require("./../models/firstname.model");

exports.getsnames = function (req, res, next) {
    let sname = req.body.surName;
    console.log("name to code controller");
  console.log("Comes to sname");
  console.log(sname);



  Surname.findOne({ Surname: sname})
  .then(function(code){
    console.log(code);
    res.json(code);
  })
  .catch(err => {
    res.status(400).send('Fname and Sname Operation Failed');
  })
  };


  exports.getfnames = function (req, res, next) {
    console.log("name to code controller");

    let fname = req.body.firstName;
    console.log("Comes to fname");
    console.log(req.body);
  
  
  
    Firstname.findOne({ Firstname: fname})
    .then(function(code){
      console.log(code);
      res.json(code);
    })
    .catch(err => {
      res.status(400).send('Fname and Sname Operation Failed');
    })

  };