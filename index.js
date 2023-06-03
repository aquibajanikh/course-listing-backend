require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Course } = require("./models/CourseModel");
const { SupportMessage } = require("./models/SupportModel");
const PORT = process.env.PORT || 3001;
const passport = require("passport");

mongoose
  .connect(process.env.mongodbURL)
  .then(() => console.log("Connected to db"));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(passport.session());

const User = require("./schemas/UserSchema");

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));

app.get("/", async function (req, res) {
  res.json(await Course.find({}));
});

app.post("/addCourse", async function (req, res) {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.send({ message: "Success!" });
});

app.post("/supportMessage", async function (req, res) {
  const newSupportMessage = new SupportMessage(req.body);
  await newSupportMessage.save();
  res.send({
    message: "We have received your message! Expect a reply shortly.",
  });
});

app.get("/fetchMessages", async function (req, res) {
  res.json(await SupportMessage.find({}));
});

app.post("/register", function (req, res) {
  User.register(
    new User({ email: req.body.email, username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err,
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.json({ success: true, message: "Your account has been saved" });
          }
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" });
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({
            success: false,
            message: "username or password incorrect",
          });
        } else {
          res.json({
            success: true,
            message: "Authentication successful",
          });
        }
      }
    })(req, res);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
