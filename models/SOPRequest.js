const mongoose = require("mongoose");

const SOPRequestSchema = new mongoose.Schema({
  title: String,
  keywords: [String],
  requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SOPRequest", SOPRequestSchema);
