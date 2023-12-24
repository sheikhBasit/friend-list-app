import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Your App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Get
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">
                Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/update">
                Update
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/delete">
                Delete
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
