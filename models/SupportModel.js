const mongoose = require("mongoose");

const { SupportSchema } = require("../schemas/SupportSchema");

const SupportMessage = mongoose.model("SupportMessage", SupportSchema);

module.exports = { SupportMessage };
