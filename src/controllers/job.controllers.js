const Jobs= require("../models/job.model")
const User=require("../models/user.model")
const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_KEY;


const getAllJob = async () => {
    let job = await Jobs.find();
    if (job) {
      return job;
    } else {
      return false;
    }
};

  
  const searchJob = async (query) => {
    console.log(query);
    await Jobs.createIndexes({ company_name: "text" });
    let jb = await Jobs.find({ $text: { $search: query } });

    
  
    if (jb) {
      return jb;
    } else {
      return false;
    }
  };

  const applyJob = async (id, id1) => {
    let user = await User.findByIdAndUpdat(
      { _id: id1 },
      { $push: { applied: { job_id: id } } }
    );
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  module.exports = {
    getAllJob,  
    searchJob,
    applyJob
   };