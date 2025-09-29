import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required:true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required:true,
    },

    mediaUrl: {
      type: String,
      required:true,
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
          required :true,
        },

        text: {
          type: String,
          required :true,
        },
        createdAt: {
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
