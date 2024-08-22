const express = require("express");
const {
  user,
  getUser,
  editUser,
  deleteUser,
  imageUpload,
  imageData,
} = require("../controller/user");
const multer = require("multer");
const cors = require("cors");
const { userData } = require("../controller/login");

const router = express.Router();
router.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.post("/user", user);
router.get("/getuser", getUser);
router.put("/edituser/:id", editUser);
router.post("/deleteuser/:id", deleteUser);
router.post("/image/upload", upload.array("images", 10), imageUpload);
router.get("/image/upload/get", imageData);

router.get("/userdata", userData);

module.exports = router;
