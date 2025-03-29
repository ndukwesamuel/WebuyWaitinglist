import React, { useState } from "react";
import "./InputField.css";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  isError,
  success,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const containerClasses = ["input-container"];
  if (success) {
    containerClasses.push("success");
  } else if (isError) {
    containerClasses.push("error-state");
  }

  return (
    <div className={containerClasses.join(" ")}>
      <label className="label" htmlFor="inputField">
        {label}
      </label>
      <input
        className="input"
        type="text"
        id="inputField"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      {isError && <p className="error mt-1">Error message here</p>}
    </div>
  );
};

export default InputField;
