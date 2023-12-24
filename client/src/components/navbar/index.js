import React from "react";
import { Link } from "react-router-dom";
import { GrTasks } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow_primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <GrTasks />
              <b>Momentum Tasks</b>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo">
                  Todo
                </Link>
              </li>

              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/register">
                      Sign up
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li
                  className="nav-item d-flex align-align-items-center"
                  onClick={handleLogout}>
                  <Link
                    className="nav-link active "
                    aria-current="page"
                    to="/logout">
                    Logout
                    <RiLogoutBoxRFill className=" logout " />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
