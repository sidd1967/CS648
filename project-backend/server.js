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
const codetoname = require("./routes/codetoname.route");
const nametocode = require("./routes/nametocode.route");
const getallnames = require("./routes/getallnames.route");
const envs = require("./configurations");
const db = require("./database");


app.use(cors());
app.use(bodyParser.json());

/*mongoose.connect('mongodb+srv://Sid03:Gz-bTFY3n2BEwCb@cs648-92tok.mongodb.net/cs648', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function(){
  console.log("MongoDB Connection Successful");
});
*/


app.use('/allnames',getallnames);
app.use("/codes",nametocode);
app.use("/names",codetoname);



var listener = app.listen(envs.PORT, function () {
  console.log("Listening on port " + listener.address().port);
});