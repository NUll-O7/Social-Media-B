// upload a Post
import Post from "../models/post.model.js";

import uploadOnCloud from "../config/cloudinary.js";

export const uploadPost = async (req, res) => {
  // media file
  // caption
  // Created Time
  try {
    const { caption, mediaType } = req.body;

    let mediaUrl = "";

    if (req.file) {
      mediaUrl = await uploadOnCloud(req.file.path);
    } else {
      return res.status(404).json({ message: "No Media File Detected" });
    }

    const post = await Post.create({
      caption,
      mediaType,
      mediaUrl,
      author: req.userId,
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(`Cannot create Post , ${error}`)
  }

  // userName
  // porfileImage
  //
};
