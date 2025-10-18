import React, { useState } from "react";
import "./Story.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faThumbsDown, faShare } from '@fortawesome/free-solid-svg-icons';
import CommentList from "../commentList/CommentList";
import redditLogo from "../assets/reddit.png"

const Story = ({post}) => {
    console.log('Post object:', post);

    const [showComments, setShowComments] = useState(false);

    const timeAgo = (timestamp) => {
        const seconds = Math.floor(Date.now() / 1000) - timestamp;
        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        return `${days} days ago`;
    };

    let imageUrl = null;

    if (post.preview && post.preview.images && post.preview.images.length > 0) {
    imageUrl = decodeUrl(post.preview.images[0].source.url);
    } else if (post.url && (post.url.endsWith('.jpg') || post.url.endsWith('.png') || post.url.endsWith('.gif'))) {
    imageUrl = post.url;
    } else if (post.thumbnail && post.thumbnail.startsWith('http')) {
    imageUrl = post.thumbnail;
    }

  return (
    <div className="story">

      <div className="profile-info">
        <div>
            <img src="https://www.redditstatic.com/avatars/avatar_default_02_46A508.png" alt="profile-pic" />
            <h4>{post.author}</h4>
        </div>
        
        <p>{timeAgo(post.created_utc)}</p>
      </div>

      <div className="content">
        <h3>{post.title}</h3>
        {imageUrl ? <img src={imageUrl} alt="story-pic" /> : <p>No image available</p>}

      </div>

      <div className="likes-comments">
        <div>
            <button><FontAwesomeIcon icon={faThumbsUp} /></button>
            <p>{post.ups}</p>
            <button><FontAwesomeIcon icon={faThumbsDown} /></button>
        </div>
        <button className="comment-btn" onClick={() => setShowComments(!showComments)}>
            <FontAwesomeIcon icon={faComment} />
            {post.num_comments}
        </button>
        <button className="share">
            <FontAwesomeIcon icon={faShare} />
            Share
        </button>
      </div>

      {showComments && (
        <CommentList postId={post.id} subreddit={post.subreddit}/>
      )}

    </div>
  );
};

export default Story;