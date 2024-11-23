import React, { useState } from "react";
import "./dashboard.css";
import FormComponent from "../emailForm/EmailFrom";
import AnotherComponent from "../anotherComponent/AnotherComponent";

const DashBoardPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const renderRightSectionContent = () => {
    if (activeComponent === "form") {
      return <FormComponent />;
    } else if (activeComponent === "anotherComponent") {
      return <AnotherComponent />;
    } else {
      return null;
    }
  };

  return (
    <div className="main">
      <div className="left-section">
        <h2>Left Section</h2>
        <div className="button-container">
          {/* Add content for the left section here */}
          <button onClick={() => handleButtonClick("form")}>Send Email</button>
          <button onClick={() => handleButtonClick("anotherComponent")}>
            Another Button
          </button>
        </div>
      </div>
      <div className="right-section">
        <h2>Right Section</h2>
        {/* Render the right section content based on the activeComponent state */}
        {renderRightSectionContent()}
      </div>
    </div>
  );
};

export default DashBoardPage;
