const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  price: String,
  duration: String,
  category: String,
  courseImg: String,
});

module.exports = { CourseSchema };
