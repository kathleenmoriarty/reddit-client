import React from "react";
import "./Comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={`https://www.redditstatic.com/avatars/avatar_default_02_0DD3BB.png`}
          alt="profile-pic"
        />
        <div>
          <p>{comment.author}</p>
          <p>Just now</p> 
        </div>
      </div>

      <div className="comment-body">
        {comment.text}
      </div>
    </div>
  );
};

export default Comment;
