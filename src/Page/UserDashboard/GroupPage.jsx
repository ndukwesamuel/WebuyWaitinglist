// src/App.js
import React, { useState } from "react";
import Create from "../../Component/Groupcomponent/Create";
import JoinGroup from "../../Component/Groupcomponent/JoinGroup";
// import PostForm from './PostForm';
import background from "../../assets/images/Rectangle 115.png";

function GroupPage() {
  const [showPostForm, setShowPostForm] = useState(true);

  const toggleForm = () => {
    setShowPostForm(!showPostForm);
  };

  return (
    <div
      className="bg-gray-100 min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Post Form App</h1>
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showPostForm ? "Join a Group" : "Create a Group"}
        </button>
      </header>
      <main className="container mx-auto p-4 mt-4 flex-grow">
        {showPostForm ? (
          <div>
            <h2 className="text-xl mb-4">Create a Post</h2>
            <Create />
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">Join a Group</h2>
            <JoinGroup />
          </div>
        )}
      </main>
    </div>
  );
}

export default GroupPage;
