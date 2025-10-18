import React from "react";
import "./CommentList.css";
import Comment from "../comment/Comment";


const CommentList = ({mockData}) => {
  return (
    <>
        {mockData.map((comment, index) => (
            <div className="comment-list">
            {/*map through the data of comments/profiles to create each 
            instance of Comment Component each with own key for ID*/}
                <Comment mockData={mockData} />
            
            </div>
        ))}
        
    </>
  );
};

export default CommentList;