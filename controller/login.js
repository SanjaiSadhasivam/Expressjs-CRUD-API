const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Sign } = require("../model/signUp");
const { User } = require("../model/user");
const secretKey = "lmsdkn%FGujsndm93w02$#!@#$%^&dhsunx72dx";

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login = await Sign.findOne({ email });

    const user = await User.find({});

    if (!login) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    const passwordValidation = await bcrypt.compare(password, login.password);
    if (!passwordValidation) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Password error" });
    }

    const token = jwt.sign(
      { userData: { ...login.toObject(), user } },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({ status: "Ok", token: token });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.userData = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const tokenData = jwt.verify(token, secretKey);

    if (!token) {
      res.status(500).json({ status: "Error", message: "Invalid token" });
    }

    res.status(200).json({ status: "ok", data: tokenData.userData });
  } catch (error) {
    console.log(error);
  }
};
