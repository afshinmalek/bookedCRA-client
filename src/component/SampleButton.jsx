import React from "react";
import axios from "axios";

function SampleButton() {
  function handleClick() {
    axios
      .post("http://localhost:3001/submit-form", {
        name: "Fred",
        email: "Flintstone@G.com",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <button
        onClick={() => {
          alert("you clicked me");
          handleClick();
        }}
      >
        click Me
      </button>
    </div>
  );
}

export default SampleButton;
