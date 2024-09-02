const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')

const updateUserController = async(req,res)=>{
  try {
    // find user
    const user = await userModel.findById({_id:req.body.id})
    // Validation 
    if(!user){
      return res.status(404).send({
        success: false,
        message: "User not found"
      })
    }
    // Update
    const {name,lastName,location}=req.body;
    if(name) user.name = name;
    if(lastName) user.userName = lastName;
    if(location) user.userName = location;
    // save user
    await user.save();
    res.status(200).send({
      success:true,
      message:"User Update Successfully",
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error
    })
  }
}

// update user password
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id })
    // validation
    if (!user) {
      return res.status(404).send({
        seccess: false,
        message: 'User Not Found'
      })
    }
    // get data from user
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide old or new password'
      })
    }
    // Check user password || compare password 
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    }
    // Hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Password Update'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Password Update API',
      error
    })
  }
}


module.exports = {updateUserController,updatePasswordController};