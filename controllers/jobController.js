const jobModel = require("../models/jobModel")

// Create job | POST
const createJobController = async (req, res) => {
  try {
    const { company, position, workType, workLocation } = req.body
    if (!company) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Company Name"
      })
    }
    if (!position) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Position"
      })
    }

    if (!workType) {
      return res.status(500).send({
        success: false,
        message: "Please Provide WorkType"
      })
    }
    if (!workLocation) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Location"
      })
    }
    const newJob = new jobModel({ company, position, workType, workLocation })
    await newJob.save();
    res.status(201).send({
      success: true,
      message: "New Job Created Successfullly",
      newJob
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Create Job API',
      error
    })
  }
}


const getJobController = async (req, res) => {
  try {
    // find Job
    const job = await jobModel.find({})
    if (!job) {
      return res.status(500).send({
        success: false,
        message: "No Job Available"
      })
    }
    res.status(200).send({
      success: true,
      totalCount: job.length,
      job
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in get Job API",
      error
    })
  }
}

// Update Job | PUT
const updateJobController = async (req, res) => {
  try {
    // find Job
    const {id} = req.params;
    const job = await jobModel.findById({ _id: id});
    // Validation
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found"
      })
    }
    // Update
    const { company, position, status, workType, workLocation } = req.body;
    if (company) job.company = company
    if (position) job.position = position
    if (status) job.status = status
    if (workType) job.workType = workType
    if (workLocation) job.workLocation = workLocation
    // Save Data
    await job.save();
    res.status(200).send({
      success: true,
      message: "Job Update Successfully",
      job
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in update Job API",
      error
    })
  }
}


// DeleteJob | DELETE
const deleteJobController = async (req, res) => {
  try {
    const {id} = req.params;
    if(!id){
      return res.status(404).send({
        success: false,
        message: "No Job Found",
      });
    }
    await jobModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Job api",
      error,
    });
  }
}
module.exports = { createJobController, getJobController, deleteJobController, updateJobController }