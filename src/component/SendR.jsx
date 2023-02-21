import React from "react";
import axios from "axios";

function SendR() {
  function handleClick() {
    let sample = { name: "sample1", email: "e1" };

    window.alert("clicked" + { sample });

    axios
      .post("http://localhost:3001/submit-form", sample, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }

  return <button onClick={handleClick}>sendR</button>;
}

export default SendR;
