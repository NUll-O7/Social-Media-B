import Story from "../models/story.model.js";
import User from "../models/user.model.js";
import uploadOnCloud from "../config/cloudinary.js";

// Create a new story
export const createStory = async (req, res) => {
  try {
    const { mediaType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No media file detected" });
    }

    // Upload to cloudinary
    const mediaUrl = await uploadOnCloud(req.file.path);

    // Create story
    const story = await Story.create({
      author: req.userId,
      mediaType,
      mediaUrl,
    });

    // Add story to user's stories array
    const user = await User.findById(req.userId);
    user.story.push(story._id);
    await user.save();

    // Populate author details
    const populatedStory = await Story.findById(story._id).populate(
      "author",
      "userName profileImage name"
    );

    return res.status(201).json(populatedStory);
  } catch (error) {
    console.error("Create story error:", error);
    return res.status(500).json({ message: "Failed to create story" });
  }
};

// Get all active stories (not expired, grouped by user)
export const getAllStories = async (req, res) => {
  try {
    const currentTime = new Date();

    // Get all non-expired stories
    const stories = await Story.find({
      expiresAt: { $gt: currentTime },
    })
      .populate("author", "userName profileImage name")
      .populate("viewers", "userName profileImage")
      .sort({ createdAt: -1 });

    // Group stories by author
    const groupedStories = stories.reduce((acc, story) => {
      const authorId = story.author._id.toString();
      
      if (!acc[authorId]) {
        acc[authorId] = {
          author: story.author,
          stories: [],
        };
      }
      
      acc[authorId].stories.push(story);
      return acc;
    }, {});

    // Convert to array
    const storiesArray = Object.values(groupedStories);

    return res.status(200).json(storiesArray);
  } catch (error) {
    console.error("Get stories error:", error);
    return res.status(500).json({ message: "Failed to fetch stories" });
  }
};

// Get stories by specific user
export const getUserStories = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentTime = new Date();

    const stories = await Story.find({
      author: userId,
      expiresAt: { $gt: currentTime },
    })
      .populate("author", "userName profileImage name")
      .populate("viewers", "userName profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json(stories);
  } catch (error) {
    console.error("Get user stories error:", error);
    return res.status(500).json({ message: "Failed to fetch user stories" });
  }
};

// View a story (add current user to viewers)
export const viewStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const currentUserId = req.userId;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Check if story is expired
    if (new Date() > story.expiresAt) {
      return res.status(400).json({ message: "Story has expired" });
    }

    // Check if user already viewed this story
    const alreadyViewed = story.viewers.some(
      (id) => id.toString() === currentUserId.toString()
    );

    if (!alreadyViewed) {
      story.viewers.push(currentUserId);
      await story.save();
    }

    // Populate and return updated story
    const updatedStory = await Story.findById(storyId)
      .populate("author", "userName profileImage name")
      .populate("viewers", "userName profileImage");

    return res.status(200).json(updatedStory);
  } catch (error) {
    console.error("View story error:", error);
    return res.status(500).json({ message: "Failed to view story" });
  }
};

// Delete a story
export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const currentUserId = req.userId;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Check if current user is the author
    if (story.author.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this story" });
    }

    // Remove story from user's stories array
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { story: storyId },
    });

    // Delete the story
    await Story.findByIdAndDelete(storyId);

    return res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Delete story error:", error);
    return res.status(500).json({ message: "Failed to delete story" });
  }
};

// Get current user's stories
export const getMyStories = async (req, res) => {
  try {
    const currentTime = new Date();

    const stories = await Story.find({
      author: req.userId,
      expiresAt: { $gt: currentTime },
    })
      .populate("author", "userName profileImage name")
      .populate("viewers", "userName profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json(stories);
  } catch (error) {
    console.error("Get my stories error:", error);
    return res.status(500).json({ message: "Failed to fetch your stories" });
  }
};