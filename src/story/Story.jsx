import React from "react";
import "./Story.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faThumbsDown, faShare } from '@fortawesome/free-solid-svg-icons';

const Story = ({mockData}) => {
  return (
    <div className="story">

      <div className="profile-info">
        <div>
            <img src={mockData.image} alt="profile-pic" />
            <h4>{mockData.author}</h4>
        </div>
        
        <p>{mockData.time}</p>
      </div>

      <div className="content">
        <h3>{mockData.title}</h3>
        <img src={mockData.image} alt="story-pic" />
      </div>

      <div className="likes-comments">
        <div>
            <button><FontAwesomeIcon icon={faThumbsUp} /></button>
            <p>{mockData.likes}</p>
            <button><FontAwesomeIcon icon={faThumbsDown} /></button>
        </div>
        <button className="comment">
            <FontAwesomeIcon icon={faComment} />
            {mockData.comments}
        </button>
        <button className="share">
            <FontAwesomeIcon icon={faShare} />
            Share
        </button>
      </div>

    </div>
  );
};

export default Story;