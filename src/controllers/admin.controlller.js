const Jobs= require("../models/job.model")
const User = require("../models/user.model");
const argon2= require("argon2")



const createJobByAdmin = async (data) => {  
  let job = await Jobs.create(data);
  if (job) {
    return true;
  } else {
    return false;
  }
};


const deleteJobByAdmin = async (id) => {
  let job = await Jobs.findByIdAndDelete({ _id: id });
  if (job) {
    return true;
  } else {
    return false;
  }
};

const getAllJob = async () => {
  let job = await Jobs.find();
  if (job) {
    return job;
  } else {
    return false;
  }
};

module.exports = {
 getAllJob,
 deleteJobByAdmin,
 createJobByAdmin
};
