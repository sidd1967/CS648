const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors =  require('cors');
const mongoose = require('mongoose');
var multer = require('multer')
const PORT = 4000;
const nameRoutes = express.Router();
var fs = require('fs');
var Q = require('q');


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
  Surname.find({}).select('Surname -_id')
  .then((allsnames) => res.json(allsnames))
  .catch((err) => res.status(400).json(`Error: ${err}`));
});


nameRoutes.route('/getall/fnames').get(function(req, res) {
  Firstname.find({}, {Firstname: 1, _id: 0})
  .then((allfnames) => res.json(allfnames))
  .catch((err) => res.status(400).json(`Error: ${err}`));
});

nameRoutes.route('/get/fnamecode').post(function(req, res) {
  console.log("Hello How are You");
  let code = req.body.fnameCode;
  console.log("Fname Here = " + code);

  Firstname.find({ Code: code})
  .then(function(name){
    console.log(name);
    res.json(name);
  })
  .catch((err) => res.status(400).json(`Error: ${err}`));
});

nameRoutes.route('/get/snamecode').post(function(req, res) {
  let code = req.body.snameCode;
  console.log("Sname Here = " + code);

  Surname.find({ Ref1: code})
  .then((sname) => res.json(sname))
  .catch((err) => res.status(400).json(`Error: ${err}`));
});




nameRoutes.route('/get/fname').post(function(req, res) {
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
});



//TO Handle the Files Containing Names
nameRoutes.route('/get/filenames').post(function (req, res) {
    console.log("/////////////////////////////////////////////////////////////////////////Backend  Executing");
    console.log("Length = " + req.body.length);
    const length = req.body.length;
    console.log(req.body);
    const data = req.body.body;
   
    var codearray = [];
    var counter = 0;
    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const getSCode = name => {
        console.log("IN GET CODE : " + name)
        var n = name[3]
        
        Surname.findOne({ Surname: name[1] })
            .then(function (code1) {
                //For the FirstName
                
                Firstname.findOne({ Firstname: name[2] })
                    .then(function (code2) {
                        counter=  counter+1;
                        codearray.push(({ "ID": name[0], "Surname": name[1], "Firstname": name[2], "SurnameCode": code1.Ref1, "FirstnameCode": code2.Code, "FinalCode": code1.Ref1 + code2.Code }));
                        //console.log(codearray)
                        console.log(counter)
                        if (counter === n) {
                            console.log("SENDING DATA BACK TO CLIENT")
                            res.json(codearray)

                        }
                    });
            })
    }
    
    const forLoop = async _ => {
        console.log('Start')

        for (let index = 0; index < length; index++) {
            const name1 = [data[index].Id, data[index].Surname,  data[index].Firstname, length]
            //const name2 = [data[index].Firstname, data[index].Id]
           
            const snameCodes = await getSCode(name1)
            //console.log(snameCodes)
            
            
        }
        console.log('End')



    }
    
    const promise = forLoop()
    console.log(promise)  
  
 

});


//To Handle File Constaining Codes
nameRoutes.route('/get/filecodes').post(function (req, res) {
    console.log("/////////////////////////////////////////////////////////////////////////BE  Executing");
    console.log("Length = " + req.body.length);
    const length = req.body.length;
   
    const data = req.body.body;
    console.log(data);
    var codearray = [];
    var counter = 0;
    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const getSCode = name => {
        console.log("IN THE GET CODE : " + name)
        var n = name[3]

        Surname.findOne({ Ref1: name[1] })
            .then(function (code1) {
                //For the FirstName
                Firstname.findOne({ Code: name[2] })
                    .then(function (code2) {
                        counter = counter + 1;
                        
                        
                        codearray.push(({ "ID": name[0], "SurnameCode": name[1], "FirstnameCode": name[2], "Surname": code1.Surname, "Firstname": code2.Firstname}));
                        //console.log(code2)
                        console.log(counter)
                        
                        if (counter === n) {
                            console.log("SENDING DATA BACK TO CLIENT")
                            console.log(codearray);
                            

                            //console.log(codearray)
                            res.json(codearray)

                        }
                    });
            })
    }

    const forLoop = async _ => {
        console.log('Start')
        
        for (let index = 0; index < length; index++) {
            const code1 = [data[index].ID, data[index].Scode, data[index].Fcode, length]
            

            const snameCodes = await getSCode(code1)
            //console.log(snameCodes)


        }
        console.log('End')



    }

    const promise = forLoop()
    console.log(promise)




});
    
    
    
    
    
    







app.use('/names', nameRoutes);



app.listen(PORT, function() {
  console.log("Server is now Running on PORT: "+PORT);
});
