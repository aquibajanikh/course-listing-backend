const mongoose = require("mongoose");

const { CourseSchema } = require("../schemas/CourseSchema");

const Course = mongoose.model("Course", CourseSchema);

module.exports = { Course };
