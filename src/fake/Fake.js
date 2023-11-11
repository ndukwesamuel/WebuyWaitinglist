import axios from "axios";
import React, { useState } from "react";

function Fake() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPath, setVideoPath] = useState("");
  const [uploading, setUploading] = useState(false); // New state variable for tracking upload status

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      // Set uploading to true when the upload starts
      setUploading(true);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;

        setVideoPath(data.videoUrl);
      }
    } catch (error) {
      console.error("Error uploading the video:", error);
    } finally {
      // Set uploading to false when the upload is done (whether success or failure)
      setUploading(false);
    }
  };

  console.log({ videoPath });
  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Video Upload and Playback</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload Video
      </button>

      {/* Conditionally render a loading message when uploading is true */}
      {uploading ? (
        <p>Uploading video, please wait...</p>
      ) : (
        videoPath && (
          <video controls width="320" height="240" className="mt-4">
            <source src={`${videoPath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}
    </div>
  );
}

export default Fake;
