import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../loginButton/LoginButton";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar_inner">
        <div className="navbar_items navbar_items_left">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashborad
          </Link>
        </div>
        <div className="navbar_items navbar_items_right">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
