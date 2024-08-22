const bcrypt = require("bcrypt");
const { Sign } = require("../model/signUp");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existUser = await Sign.findOne({ email: email });
    if (existUser) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Email Already Exists" });
    }
    const signup = new Sign({
      name,
      email,
      password: hashedPassword,
    });

    const result = await signup.save();
    res
      .status(200)
      .json({ status: "ok", message: "User registered", data: result });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message });
  }
};
