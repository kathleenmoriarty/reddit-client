import React from "react";
import "./StoryCard.css";
import Story from "../story/Story";

const StoryCard = ({posts}) => {
  return (
    <>
    {posts.map((postWrapper, index) => (
        <div className="storycard" key={postWrapper.data.id || index}>
            <Story post={postWrapper.data} />
        </div>
    ))}
        
    </>
  );
};

export default StoryCard;