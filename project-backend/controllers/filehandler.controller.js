const Surname = require("../models/surname.model");
const Firstname = require("../models/firstname.model");

exports.name_to_code = function (req, res, next) {
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
                console.log(code1);
                Firstname.findOne({ Firstname: name[2] })
                    .then(function (code2) {
                      console.log(code2);
                        counter=  counter+1;
                        if(!code1){

                          codearray.push(({ "ID": name[0], "Surname": name[1], "Firstname": name[2], "SurnameCode": '', "FirstnameCode": code2.Code, "FinalCode": '' + code2.Code }));

                       }
                       else if(!code2){
                        codearray.push(({ "ID": name[0], "Surname": name[1], "Firstname": name[2], "SurnameCode": code1.Ref1, "FirstnameCode": '', "FinalCode": code1.Ref1 + '' }));

                       }
                       else{
                        codearray.push(({ "ID": name[0], "Surname": name[1], "Firstname": name[2], "SurnameCode": code1.Ref1, "FirstnameCode": code2.Code, "FinalCode": code1.Ref1 + code2.Code }));
                       }





                        
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
            const name1 = [data[index].ID, data[index].Surname,  data[index].Firstname, length]
            //const name2 = [data[index].Firstname, data[index].Id]
           
            const snameCodes = await getSCode(name1)
            //console.log(snameCodes)
            
            
        }
        console.log('End')



    }
    
    const promise = forLoop()
    console.log(promise)  
  
 
  };

  exports.code_to_name = function (req, res, next) {
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



 
  };