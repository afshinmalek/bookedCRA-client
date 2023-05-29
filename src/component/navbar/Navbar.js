import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../loginButton/LoginButton";

function Navbar() {
  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar_inner">
        <div className="navbar_items navbar_items_left">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar_items navbar_items_right">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
