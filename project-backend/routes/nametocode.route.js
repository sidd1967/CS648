const express = require("express");
const router = express.Router();

const nametocode_controller = require("../controllers/nametocode.controller");
const filenametocode_controller = require("../controllers/filehandler.controller");

router
  .route("/get/fname")
  .post(nametocode_controller.getfnames);

router
  .route("/get/sname")
  .post(nametocode_controller.getsnames);


router
  .route("/fileget/filenames")
  .post(filenametocode_controller.name_to_code);

module.exports = router;