const mongoose = require("mongoose");

const groupBody = {
  group_name:{
    type: String,
  },
  members: {
    type:Number,
    default:0
  },
  created_at:{
      type:String
  },
  group_code:{
      type:String
  },
  image_url:{
    type:String
  },
  default:{
    type:Boolean
  },
  description:{
    type:String
  }
};
const groupSchema = mongoose.Schema(groupBody);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
