import React from "react";
import "./StoryCard.css";
import Story from "../story/Story";

const StoryCard = ({mockData}) => {
  return (
    <div className="storycard">
      <Story mockData={mockData} />
    </div>
  );
};

export default StoryCard;