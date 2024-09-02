const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
//* schema
const jobSchema = new mongoose.Schema({
  company:{
    type:String,
    required:[true,"Company name is require"]
  },
  position:{
    type:String,
    required:[true,"Job Position is require"]
  },
  status:{
    type:String,
    enum:['pending','reject','interview'],
    default:'pending'
  },
  workType:{
    type:String,
    enum:['full-time','part-time','internship'],
    default:'full-time',
    required:true
  },
  workLocation:{
    type:String,
    default:"Meerut",
    required:[true,"Work location is required"]
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
}, { timestamps: true })

// export
module.exports = mongoose.model("Job", jobSchema)