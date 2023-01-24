const mongoose = require("mongoose");

let jobs = new mongoose.Schema({
  company_name: { type: String, required: true },
  position: { type: String, required: true },
  contract: { type: String, required: true },
  location: { type: String, required: true },
});

let Jobs = mongoose.model("job", jobs);

module.exports = Jobs;