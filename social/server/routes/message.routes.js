import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getConversation,
  getAllConversations,
  markAsRead,
} from "../controllers/message.controllers.js";

const messageRouter = express.Router();

// Get conversation with specific user
messageRouter.get("/conversation/:userId", isAuth, getConversation);

// Get all conversations
messageRouter.get("/conversations", isAuth, getAllConversations);

// Mark messages as read
messageRouter.post("/read/:userId", isAuth, markAsRead);

export default messageRouter;