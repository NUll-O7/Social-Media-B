import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai"; // Like
import { BiComment } from "react-icons/bi"; // Comment
import { BsBookmark } from "react-icons/bs"; // Save

function Post({ post }) {
  console.log(post);

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl p-4 mb-6 shadow-sm">
      {/* Post header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[40px] h-[40px] rounded-full bg-neutral-300 overflow-hidden">
          <img
            src={post.author.profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-sm">{post.author.userName}</p>
          <p className="text-xs text-neutral-500">2 hrs ago</p>
        </div>
      </div>

      {/* Post image */}
      <div className="w-full h-[500px] bg-neutral-200 rounded-lg mb-3 overflow-hidden">
        {post.mediaType === "image" ? (
          <img
            src={post.mediaUrl}
            alt="post"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={post.mediaUrl}
            controls
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Post actions + caption */}
      <div className="flex gap-4 mb-2 text-[22px] text-neutral-700">
        <AiOutlineHeart className="cursor-pointer hover:text-red-500 transition" />
        <BiComment className="cursor-pointer hover:text-blue-500 transition" />
        <BsBookmark className="cursor-pointer hover:text-green-500 transition ml-auto" />
      </div>
      <p className="text-sm text-neutral-700">
        {post.caption}
      </p>
    </div>
  );
}

export default Post;
