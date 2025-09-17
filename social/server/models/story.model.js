import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
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

    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 86400 // 24 hrs 

    }
  },

  { timestamps: true }
);

const Story = mongoose.model("story", storySchema);

export default Story;
