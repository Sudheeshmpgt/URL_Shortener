const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  long_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  visit: {
    type: Number,
    default:0
  }
});

module.exports = UrlModel = mongoose.model("Url", urlSchema);