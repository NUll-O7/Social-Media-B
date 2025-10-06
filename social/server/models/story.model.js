import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    expiresAt:{
      type : Date,
      default:function(){
        return  new Date(Date.now() + 24*60*60*1000 )
      },

      index:{expires:0} // TTL indexing

    }
  },
  { timestamps: true }
);

const Story = mongoose.model("story", storySchema);

export default Story;
