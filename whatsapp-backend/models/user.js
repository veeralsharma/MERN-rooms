const mongoose = require("mongoose");

const userBody = {
  name:{
    type: String,
  },
  email: {
    type: String,
  },
  profile_image:{
      type:String
  },
  joined_groups:{
      type:[]
  }
};
const userSchema = mongoose.Schema(userBody);

const User = mongoose.model("User", userSchema);

module.exports = User;
