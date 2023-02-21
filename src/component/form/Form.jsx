import React, { useState } from "react";
import axios from "axios";

function MyForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  let str = JSON.stringify(formData);
  function handleSubmit(event) {
    window.alert("submitted" + { str });
    event.preventDefault();
    axios
      .post("http://localhost:3001/submit-form", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleClick() {
    let sample = { name: "sample1", email: "e1" };

    window.alert("clicked" + { str });

    axios
      .post("http://localhost:3001/submit-form", sample, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="name">
          Name:
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label for="email">
          Email:
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{formData.name + " , " + formData.email}</p>
      <button onClick={handleClick}>send req</button>
    </div>
  );
}

export default MyForm;
