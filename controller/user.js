const { User, Image } = require("../model/user");

exports.user = async (req, res) => {
  const { userName, age, dob, mobile } = req.body;

  try {
    const number = await User.find({});

    const findNum = number.filter((num) => {
      return num.userDetails.some((detail) => detail.mobile === mobile);
    });

    if (findNum.length > 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Duplicate mobile number" });
    }

    console.log(findNum, "number");

    const user = new User({
      userName,
      userDetails: [
        {
          age,
          dob,
          mobile,
        },
      ],
    });

    const result = await user.save();

    res.status(200).json({ status: "ok", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Failed" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json({ status: "ok", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.editUser = async (req, res) => {
  const { userName } = req.body;
  try {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      { userName },
      { new: true }
    );
    res
      .status(200)
      .json({ status: "ok", message: "updated successfully", data: result });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok", message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.imageUpload = async (req, res) => {
  try {
    if (req.files) {
      const newImage = new Image({
        image: req.files.map((file) => file.path),
      });

      await newImage.save();
      res.status(200).json({
        status: "OK",
        message: "Image uploaded successfully",
      });
    } else {
      res.status(400).json({
        status: "FAIL",
        message: "No files uploaded",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("File not uploaded");
  }
};

exports.imageData = async (req, res) => {
  try {
    const allImages = await Image.find({});
    const imageUrl = allImages.map((img) => ({
      ...img.toObject(),
      image: img.image.map((elem) => `http://localhost:4000/${elem}`),
    }));

    res.status(200).json({ status: "OK", data: imageUrl });
  } catch (error) {
    res.status(500).json({ status: "OK", message: "Pudungiruchu aunty!!!" });
  }
};
