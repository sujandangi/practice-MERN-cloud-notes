import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-dark navbar-dark"
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              CloudNotes
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/texttool"
                  >
                    TextTool
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
