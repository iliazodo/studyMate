import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
  },
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
  }],
  communities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  followings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  }],
  conversations:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  }],
  isVerified:{
    type: Boolean,
    default: false
  },
  isBan:{
    type:Boolean,
    default: false
  },
  blockedUsers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  }],
  role:{
    type: String,
    enum: ["admin" , "user"],
    default: "user"
  }
});

const User = mongoose.model("User" , userSchema);

export default User;
