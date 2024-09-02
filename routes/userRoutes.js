const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const { updateUserController,updatePasswordController } = require("../controllers/userController");
const router = express.Router();

//! Routes
//* UPDATE USER | PUT
router.put('/updateUser/:id',authMiddleware,updateUserController)

//* UPDATE USER PASSWORD | PUT
router.post('/updateUserPassword/:id',authMiddleware,updatePasswordController)


//!Export Router
module.exports =router;