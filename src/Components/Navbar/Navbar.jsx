import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="desktop-nav">
        <nav className="navbar">
          <div className="navbar--logo-holder">
            <h1>Task</h1>
          </div>
          <ul className="navbar--link">
            <li className="navbar--link-item">
              <NavLink to={"/"}>Posts</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
