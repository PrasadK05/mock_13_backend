require("dotenv").config();
const express = require("express");
const { searchJob, getAllJob, applyJob } = require("../controllers/job.controllers");
const { findUser } = require("../controllers/user.controllers");
const Jobs = require("../models/job.model");
const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

app.post("/", async (req, res) => {
//   let query = req.query.q;
//   let filter = req.body.type;
let data= req.query
// console.log(data);

if (data.q) {
    let jobs = await searchJob(data.q);
    if (!jobs) {
      return res.status(401).send({ message: "product not found" });
    } else {
      return res.status(200).send(jobs);
    }
  }

  if (data) {
    let jobs = await Jobs.find({ company_name: filter });
    if (!jobs) {
      return res.status(401).send({ message: "jobs not found" });
    } else {
      return res.status(200).send(jobs);
    }
  }  else {
    let job = await getAllJob();
    if (job) {
      return res.status(200).send(job);
    } else {
      return res.status(401).send({ message: "something went wrong" });
    }
  }

});

app.post("/apply/:id", async (req, res) => {
    let { id } = req.params;
    let token = req.headers.authorization;

    try {
        let veri = jwt.verify(token, token_secret);
        let user = await findUser({ email: veri.email });
        let job = await Jobs.findOne({_id:id})
        if (!job) {
          return res.status(401).send({ message: "blog not found" });
        }      
    
        let bl = await applyJob(job._id, user._id);
        if (bl) {
          return res.status(200).send({ message: "comment uploaded successfully" });
        } else {
          return res.status(401).send({ message: "something went wrong" });
        }
      } catch (e) {
        return res.status(401).send({ message: e.message });
      }
})

module.exports=app
