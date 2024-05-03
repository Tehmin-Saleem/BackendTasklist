const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  customerName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  overdueDays: {
    type: Number,
    required: true,
  },

});



const userloginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

 


const usersignupSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  // other user attributes...
});

module.exports = {
  User: mongoose.model("User", userSchema),
  UserLogin: mongoose.model("UserLogin", userloginSchema),
  UserSignUp: mongoose.model("UserSignUp", usersignupSchema),
};



