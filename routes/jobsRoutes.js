const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const {createJobController, getJobController, updateJobController, deleteJobController} = require("../controllers/jobController")
const router = express.Router();

// Routes
router.post("/create-job",authMiddleware,createJobController)
router.get("/getJob",authMiddleware,getJobController)
router.put("/updateJob/:id",authMiddleware,updateJobController)
router.delete("/deleteJob/:id",authMiddleware,deleteJobController)


// Export 
module.exports = router