const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // status: {
  //   type: String,
  //   enum: ["Pending", "Completed", "Decline"],
  //   required: true,
  // },
  // attachment:{
  //   type:String,
    
  // },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
 
});

module.exports = mongoose.model("Task", taskSchema);
