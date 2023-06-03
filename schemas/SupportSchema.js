const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    supportMessage: String,
    responseText: String,
  },
  { timestamps: true }
);

module.exports = { SupportSchema };
