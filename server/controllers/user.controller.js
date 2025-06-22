import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in user.controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const blockUser = async (req, res) => {
  try {
    const targetId = req.params.userId;
    const userId = req.user._id;

    const target = await User.findById(targetId);
    const user = await User.findById(userId);

    if(userId == targetId){
        return res.status(400).json({error: "You can't block yourself"})
    }

    if (!target) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    if (user.blockedUsers.includes(targetId)) {
      user.blockedUsers = user.blockedUsers.filter((id) => id != targetId);
      await user.save();
      return res.status(200).json({ message: "User unblocked successfully" });
    }

    user.blockedUsers.push(targetId);
    await user.save();
    
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.log("Error in user.controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {};

export const editMessage = async (req, res) => {};

export const deleteMessage = async (req, res) => {};

export const followUser = async (req, res) => {};
