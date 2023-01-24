require("dotenv").config();
const express = require("express");
const { verifyAdminToken } = require("../middlewares/admin.middleware");
const {
  getAllJob,
  deleteJobByAdmin,
  createJobByAdmin,
} = require("../Controllers/admin.controlller");

const app = express.Router();

app.get("/get_jobs", async (req, res) => {
  let job = await getAllJob();
  if (job) {
    res.status(200).send(job);
  } else {
    res.status(401).send({ status: false, message: "something went wrong" });
  }
});

app.delete("/delete_job/:id", async (req, res) => {
  let { id } = req.params;
  let job = await deleteJobByAdmin(id);
  if (job) {
    res
      .status(200)
      .send({ status: true, message: "job deleted successfully" });
  } else {
    res.status(401).send({ status: false, message: "something went wrong" });
  }
});

app.post("/add_job", async (req, res) => {
  let data = req.body;
  let job = await createJobByAdmin(data);
  if (job) {
    res
      .status(200)
      .send({ status: true, message: "job created successfully" });
  } else {
    res.status(401).send({ status: false, message: "something went wrong" });
  }
});

module.exports = app;
