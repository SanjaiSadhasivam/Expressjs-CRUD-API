const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(bodyParser.json());
const PORT = process.env.PORT;

const user = require("./route/user");
const signUpRoute = require("./route/signUp");
const loginRoute = require("./route/login");

app.listen(PORT, () => {
  console.log(`server connected: ${PORT}`);
});

app.use("/api", user);
app.use("/auth", signUpRoute);
app.use("/auth", loginRoute);

mongoose
  .connect(
    "mongodb+srv://sanjaisnj97:Ed79qpihV7WbONMh@cluster0.5xkuqe2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    console.log("DB COnnected");
  })
  .catch((e) => {
    console.log(e);
  });
