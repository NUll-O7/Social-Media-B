// upload a Post
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

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

    const user = await User.findById(req.userId).populate("posts");
    user.posts.push(post._id);
    await user.save();

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "userName profileImage"
    );

    // userName
    // porfileImage

    return res.status(200).json(populatedPost);
  } catch (error) {
    console.error(`Cannot create Post , ${error}`);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // Get current user with following list
    const currentUser = await User.findById(req.userId);
    
    // Create array of user IDs to fetch posts from (followed users + self)
    const userIds = [req.userId, ...currentUser.following];
    
    // Get posts only from these users
    const posts = await Post.find({
      author: { $in: userIds }
    })
      .populate("author", "name userName profileImage")
      .sort({ createdAt: -1 }); // Latest posts first
    
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: `Cannot get posts error ${error}` });
  }
};

export const like = async (req, res) => {
  // get the user
  // get the post id
  // check for alreadyLiked or not
  // if not add one like - update
  // if liked then remove - update
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Could not find Post" });
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() == req.userId.toString()
  );

  if (alreadyLiked) {
    // Unlike
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.userId.toString()
    );
  } else {
    // like
    post.likes.push(req.userId);
  }

  await post.save();
  await post.populate("author", "userName profileImage");

  return res.status(200).json(post);
};

// controller for comments
 export const comments= async(req , res)=>{
    // post id
    // user id
    // text 
    // createad At


 }
