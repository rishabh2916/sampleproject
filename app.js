const express = require("express");
const path = require("node:path");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://rishabhrajpurohit1703:12345666@cluster0.mv2eggk.mongodb.net/minorproject?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

const viewRouter = require("./router/viewRouter");
const User = require("./models/userSchema");

//setting view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// body-parser to read req.body
app.use(express.json({ limit: "10kb" }));

// ROUETES
app.use("/", viewRouter);
app.use("/api/v1/login", async (req, res, next) => {
    console.log(req.body);
  // 1. get the email and password from req.body
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  try {
    // 2.find user with given email
    let foundUser = await User.findOne({ email: userEmail });
    console.log(foundUser)
    if (!foundUser) {
      return res.status(422).send({ message: "Invalid Email or Password!" });
    }
    // 3.if user exist compare the pass
    let isValidated = foundUser.password === userPassword ? true : false;
    if (!isValidated) {
      throw new Error("password is not matching");
    }
    res.status(201).json({
      status: "success",
      data: {
        foundUser,
      },
    });
  } catch (e) {
    console.log(e);
  }
});
app.use("/api/v1/signup", async (req, res, next) => {
  // console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

const port = 3300;
app.listen(port, () => {
  console.log("Server Started at port 3300");
});
