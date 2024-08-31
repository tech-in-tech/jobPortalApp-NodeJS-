const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
//* schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    minlength:[6,"Password must contain 6 character"]
  },
  location: {
    type: String,
    default: "India"
  }
}, { timestamps: true })

// middleware
userSchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
})



// export
module.exports = mongoose.model("User", userSchema)