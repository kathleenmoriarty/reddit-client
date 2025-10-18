import React from "react";
import "./Comment.css";


const Comment = ({mockData}) => {
  return (
    <div className="comment">
      <div>
        <img src={mockData.image} alt="profile-pic" />
        <div>
            <p>AUTHOR NAME HERE</p>
            <p>HOW LONG AGO</p>
        </div>
      </div>

      <div>
        COMMENT HERE
      </div>
      
    </div>
  );
};

export default Comment;