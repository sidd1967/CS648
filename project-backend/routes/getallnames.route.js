const express = require("express");
const router = express.Router();

const getallnames_controller = require("./../controllers/getallnames.controller");

router
  .route("/getall/fnames")
  .get(getallnames_controller.getall_fnames);

router
  .route("/getall/snames")
  .get(getallnames_controller.getall_snames);

module.exports = router;