import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <FeedbackForm />
        <FeedbackList />
      </main>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop />
    </div>
  );
}

export default App;