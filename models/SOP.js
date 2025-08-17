const mongoose = require("mongoose");

const SOPSchema = new mongoose.Schema({
  title: String,
  content: String,
  keywords: [String],
});

module.exports = mongoose.model("SOP", SOPSchema);
