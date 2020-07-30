const express = require("express");
const router = express.Router();

const codetoname_controller = require("../controllers/codetoname.controller");
const filecodetoname_controller = require("../controllers/filehandler.controller");



router
  .route("/get/fnamecode")
  .post(codetoname_controller.getfnamecode);

router
  .route("/get/snamecode")
  .post(codetoname_controller.getsnamecode);

router
  .route("/fileget/filecodes")
  .post(filecodetoname_controller.code_to_name);

module.exports = router;