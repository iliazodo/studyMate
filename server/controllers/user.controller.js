import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

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

    if (userId == targetId) {
      return res.status(400).json({ error: "You can't block yourself" });
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

export const sendMessage = async (req, res) => {
  try {
    const targetId = req.params.userId;
    const userId = req.user._id;
    const { message } = req.body;

    const target = await User.findById(targetId);
    if (!target) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const conversation = await Conversation.findOne({
      users: { $all: [userId, targetId] },
    });

    const newMessage = await Message.create({
      message,
      senderId: userId,
      receiverId: targetId,
    });

    if (conversation) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
      res.status(201).json({
        id: newMessage._id,
        message: newMessage.message,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
      });
    } else {
      const newConversation = await Conversation.create({
        messages: [newMessage._id],
        users: [targetId, userId],
      });
      res.status(201).json({
        id: newMessage._id,
        message: newMessage.message,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        conversation: newConversation._id,
      });
    }
  } catch (error) {
    console.log("Error in user.controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const messageId = req.params.messageId;
    const { newMessage } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message doesn't exist" });
    }

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "This is not your message" });
    }

    message.message = newMessage;
    await message.save();
    res.status(200).json({
      id: messageId,
      newMessage,
    });
  } catch (error) {
    console.log("Error in user.controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const messageId = req.params.messageId;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message doesn't exist" });
    }

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "This is not your message" });
    }

    await message.deleteOne();
    res.status(200).json({
      id: messageId,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log("Error in user.controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const targetId = req.params.userId;
    const userId = req.user._id;

    const target = await User.findById(targetId);
    const user = await User.findById(userId);

    if (userId == targetId) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    if (!target) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    if (user.followings.includes(targetId)) {
      user.followings = user.followings.filter((id) => id != targetId);
      target.followers = user.followings.filter((id) => id != userId);

      await user.save();
      await target.save();
      return res.status(200).json({ message: "User unfollowed successfully" });
    }

    user.followings.push(targetId);
    target.followers.push(userId);

    await user.save();
    await target.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.log("Error in user.controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
