import { useRef, useEffect } from "react";
import "./App.css";
import "@smile_identity/smart-camera-web";
import axios from "axios"; // Import Axios

function App() {
  const webRef = useRef(null);

  const handle_post = async (data) => {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIxYzk1YzkxZDY4ZmNkOWY0ZTIyZTkiLCJpYXQiOjE3MTY3MzEyOTIsImV4cCI6MTcxNzU5NTI5Mn0.jO48--yX82RYxOctMJE98__TFHSCGGpEhGDWZphO4iU";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("http://localhost:8000/api/kyc", data, config) // Adjust the URL as per your requirement
      .then((response) => {
        console.log("Post request successful:", response);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };

  useEffect(() => {
    const imagesComputedHandler = (e) => {
      // console.log(e.detail);
      handle_post(e.detail);
    };
    const webComponent = webRef.current;

    if (webComponent) {
      webComponent.addEventListener("imagesComputed", imagesComputedHandler);
    }

    return () => {
      if (webComponent) {
        webComponent.removeEventListener(
          "imagesComputed",
          imagesComputedHandler
        );
      }
    };
  }, []);

  return (
    <>
      <smart-camera-web ref={webRef}></smart-camera-web>
    </>
  );
}

export default App;
