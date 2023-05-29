import React from "react";
import MyCalendar from "../OldC.jsx";

function HomePage() {
  return (
    <div className="app-border">
      <div className="left-side">
        <h3 className="welcome">Book your Appointment!</h3>
        <img className="pic" src="/pictures/time3.png" alt="" />
      </div>
      <div className="bird-sitting">
        <MyCalendar />
        <img className="pic-b" src="/pictures/bird4.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
