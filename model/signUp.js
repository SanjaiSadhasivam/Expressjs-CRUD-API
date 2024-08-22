const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Sign = mongoose.model("signup", signupSchema);
module.exports = { Sign };
