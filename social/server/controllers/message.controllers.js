import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// Get conversation between two users
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .populate("sender", "userName profileImage")
      .populate("receiver", "userName profileImage")
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: `Get conversation error: ${error.message}` });
  }
};

// Get all conversations for current user
export const getAllConversations = async (req, res) => {
  try {
    const currentUserId = req.userId;

    // Get all unique users that current user has chatted with
    const messages = await Message.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .populate("sender", "userName profileImage")
      .populate("receiver", "userName profileImage")
      .sort({ createdAt: -1 });

    // Get unique conversations
    const conversationsMap = new Map();
    
    messages.forEach((message) => {
      const otherUserId = message.sender._id.toString() === currentUserId 
        ? message.receiver._id.toString() 
        : message.sender._id.toString();
      
      if (!conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, {
          user: message.sender._id.toString() === currentUserId ? message.receiver : message.sender,
          lastMessage: message.message,
          lastMessageTime: message.createdAt,
          isRead: message.isRead,
        });
      }
    });

    const conversations = Array.from(conversationsMap.values());
    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ message: `Get conversations error: ${error.message}` });
  }
};

// Mark messages as read
export const markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    await Message.updateMany(
      { sender: userId, receiver: currentUserId, isRead: false },
      { isRead: true }
    );

    return res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    return res.status(500).json({ message: `Mark as read error: ${error.message}` });
  }
};