const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3001;

const mongodbURL =
  "mongodb+srv://aquibajanikh:aquibajanikh@cluster0.xgjdncd.mongodb.net/CourseData?retryWrites=true&w=majority";

mongoose.connect(mongodbURL).then(() => console.log("Connected to db"));

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    title: String,
    price: String,
    duration: String,
    category: String,
  })
);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async function (req, res) {
  res.json(await Course.find({}));
});

app.post("/addCourse", async function (req, res) {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.send({ message: "Success!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
