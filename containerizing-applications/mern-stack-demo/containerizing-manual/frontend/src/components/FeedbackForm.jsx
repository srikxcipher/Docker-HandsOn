import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return toast.error("Feedback cannot be empty");

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/feedback", { message: input });
      setInput("");
      toast.success("Feedback submitted!");
      document.dispatchEvent(new Event("feedback-submitted"));
    } catch {
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-6">
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Leave your feedback here..."
        rows="3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;