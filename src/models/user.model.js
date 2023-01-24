const mongoose = require("mongoose");

let users = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  applied: [{ job_id: { type: mongoose.Schema.Types.ObjectId, ref: "job" } }],
});

let User = mongoose.model("user", users);

module.exports = User;
