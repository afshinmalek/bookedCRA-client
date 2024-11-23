import React, { useState } from "react";
import axios from "axios";

import "./emailForm.css";
import * as dotenv from "dotenv";
dotenv.config();

let appUrl = process.env.REACT_APP_APP_URL;

const FormComponent = () => {
  const [email1, setEmail] = useState("");
  const [name1, setName] = useState("");
  const [date1, setDate] = useState("");

  let backendPath = `${appUrl}/email-open-spots`;
  let info = { email: email1, name: name1, date: date1 };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendPath, info);
      // Handle the response
      console.log("Response:", response.data);
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="groupInput">
          <input
            type="email"
            id="email1"
            value={email1}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="email1" className="form-lable">
            Email
          </label>
        </div>
      </div>
      <div className="groupInput">
        <input
          type="text"
          id="name1"
          value={name1}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="name1" className="form-lable">
          Name
        </label>
      </div>
      <div className="groupInput">
        <input
          type="date"
          id="date1"
          value={date1}
          onChange={(e) => setDate(e.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="date1" className="form-lable">
          Date
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
