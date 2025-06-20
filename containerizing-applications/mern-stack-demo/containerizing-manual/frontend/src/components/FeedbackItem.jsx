import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

const FeedbackItem = ({ message }) => (
  <div className="bg-white p-4 rounded shadow flex items-start gap-2">
    <FaRegCommentDots className="text-blue-500 text-xl mt-1" />
    <p className="text-gray-700">{message}</p>
  </div>
);

export default FeedbackItem;