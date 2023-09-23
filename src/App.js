import React, { useState } from "react";
import InputField from "./InputField";
import "./styles.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (newValue) => {
    setEmail(newValue);

    if (!isValidEmail(newValue)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Label"
          placeholder="Enter your name"
          value={name}
          onChange={(newValue) => setName(newValue)}
          success={success}
          isError={isError}
        />
      </form>
    </div>
  );
}

export default App;
