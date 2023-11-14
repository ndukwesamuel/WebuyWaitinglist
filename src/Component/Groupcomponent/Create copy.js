// src/JoinGroupForm.js
import React, { useState } from "react";

function Create() {
  const [formData, setFormData] = useState({
    groupName: "",
    memberName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the join group form submission logic here
    console.log("Join Group Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="groupName" className="block text-gray-600 mb-2">
          Group Name:
        </label>
        <input
          type="text"
          id="groupName"
          name="groupName"
          value={formData.groupName}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="memberName" className="block text-gray-600 mb-2">
          Member Name:
        </label>
        <input
          type="text"
          id="memberName"
          name="description"
          value={formData.memberName}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Join Group
      </button>
    </form>
  );
}

export default Create;
