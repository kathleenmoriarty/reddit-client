import React, { useEffect, useState } from "react";
import "./CommentList.css";
import Comment from "../comment/Comment";
import { useSelector } from "react-redux";

const CommentList = ({ postId, subreddit }) => {
  const [comments, setComments] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/comments/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'diet-reddit/0.1 by yourUsername'
            }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        const commentData = data[1]?.data?.children || [];
        const formattedComments = commentData.map((item) => ({
          author: item.data.author,
          text: item.data.body,
        }));

        setComments(formattedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // fallback to empty array on error
      }
    }

    if (token && postId && subreddit) {
        fetchComments();
      }
}, [token, postId, subreddit]);

  return (
    <div className="comment-list">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};

export default CommentList;
