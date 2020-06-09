const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors =  require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const nameRoutes = express.Router();


const Surname = require("./models/surname.model");
const Firstname = require("./models/firstname.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Sid03:Gz-bTFY3n2BEwCb@cs648-92tok.mongodb.net/cs648', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function(){
  console.log("MongoDB Connection Successful");
});

nameRoutes.route('/').get(function(req, res) {
  names.find(function(err, code) {
    if(err) {
      console.log(err);
    }
    else{
      res.json(code);
    }
  })
})

nameRoutes.route('/getall/snames').get(function(req, res) {
  Surname.find({}, {Surname: 1, _id: 0})
  .then((allsnames) => res.json(allsnames))
  .catch((err) => res.status(400).json(`Error: ${err}`));
});


nameRoutes.route('/getall/fnames').get(function(req, res) {
  Firstname.find({}, {Firstname: 1, _id: 0})
  .then((allfnames) => res.json(allfnames))
  .catch((err) => res.status(400).json(`Error: ${err}`));
});





nameRoutes.route('/get/fname').post(function(req, res) {
  let fname = req.body.firstName;
  console.log("Comes to fname");
  console.log(fname);



  Firstname.findOne({ Firstname: fname})
  .then(function(code){
    console.log(code);
    res.json(code);
  })
  .catch(err => {
    res.status(400).send('Fname and Sname Operation Failed');
  })

  /*Surname.findOne({ surname: sname}, function(err, code) {
    res.json(code);
  });*/
});

nameRoutes.route('/get/sname').post(function(req, res) {
  let sname = req.body.surName;
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

  /*Surname.findOne({ surname: sname}, function(err, code) {
    res.json(code);
  });*/
});
/*
nameRoutes.route('/add').post(function(req, res) {
  console.log(req.body.firstName);
  console.log(req.body.surName);
  const fname = new Firstname({
    first_name: req.body.firstName,

  });
  const sname = new Surname({

    surname: req.body.surName,

  });

  fname.save()
  .then(code => {
    sname.save()
    .then(fname => {
      res.status(200).json({'Fname and Sname': 'record added successfully'})
    })
    .catch(err => {
      res.status(400).send('Fname and Sname Operation Failed');
    })
  }).catch(err => {
    res.status(400).send('Both Operation Failed');
});
});


nameRoutes.route('/log').post(function(req, res) {
  let name = new names(req.body);
  name.save()
  .then(name => {
    res.status(200).json({'name': 'name is logged successfully'});
  })
  .catch(err => {
    res.status(400).send('Logging Failed');
  });
});
*/

app.use('/names', nameRoutes);



app.listen(PORT, function() {
  console.log("Server is now Running on PORT: "+PORT);
});
