import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, logout, login, userHasScopes } = this.props.auth;
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/public">Public</Link>
            </li>
            {isAuthenticated() && (
              <li>
                <Link to="/private">Private</Link>
              </li>
            )}
            <li>
            </li>
            {isAuthenticated() && userHasScopes(["read:courses"]) && (
              <li>
                <Link to="/courses">Courses</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={isAuthenticated() ? logout : login}>
                {isAuthenticated() ? "Log Out" : "Log in"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
