import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required,
    },

    mediaUrl: {
      type: String,
      required,
    },

    caption: {
      type: String,
      default: "",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required,
        },

        text: {
          type: String,
          required,
        },
        createaAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    // reels
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;
