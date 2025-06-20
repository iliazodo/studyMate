import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
