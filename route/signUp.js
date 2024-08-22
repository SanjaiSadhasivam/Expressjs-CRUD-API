const express = require("express");
const signupController = require("../controller/signUp");

const router = express.Router();

router.post("/register", signupController.signup);

module.exports = router;
