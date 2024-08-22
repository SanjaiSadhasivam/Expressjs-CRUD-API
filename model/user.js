const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  userDetails: [
    {
      age: {
        type: Number,
        min: 0,
      },
      dob: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
        unique: true,
      },
    },
  ],
});

const ImageSchema = new mongoose.Schema({
  image: {
    type: [String],
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
const Image = mongoose.model("Image", ImageSchema);

module.exports = { User, Image };
