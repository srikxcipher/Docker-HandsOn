import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:5000/feedback");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    fetchFeedbacks();
    document.addEventListener("feedback-submitted", fetchFeedbacks);
    return () => document.removeEventListener("feedback-submitted", fetchFeedbacks);
  }, []);

  return (
    <div className="space-y-4">
      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedback yet.</p>
      ) : (
        feedbacks.map((fb, idx) => <FeedbackItem key={idx} message={fb.message} />)
      )}
    </div>
  );
};

export default FeedbackList;