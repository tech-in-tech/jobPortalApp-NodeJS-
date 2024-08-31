const userModels = require("../models/userModels");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //*Validation
    if (!name) {
      next("Please Provide Name")
    }
    if (!email) {
      next("Please Provide Email")
    }
    if (!password) {
      next("Please Provide Password")
    }
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      next("Email already Registered please Login")
    }
    const user = await userModels.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User Created Successsfully",
      user,
    });
  } catch (error) {
    console.log(error);
    next("Error is Register Controller")
  }
}

// Ligon Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email"
      })
    }
    if (!password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Password"
      })
    }
    // Check user
    const user = await userModels.findOne({ email })
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      })
    }
    // Check user password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password",
      })
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10D"
    })
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Login API',
      error
    })
  }
}


module.exports = { registerController, loginController };