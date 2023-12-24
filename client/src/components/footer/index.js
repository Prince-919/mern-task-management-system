import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center  footer">
      <p className="m-0">
        &copy; {new Date().getFullYear()} :{" "}
        <Link
          className="footer_link"
          target="_blank"
          to="https://princesharma01.netlify.app/">
          https://princesharma01.netlify.app
        </Link>
      </p>
    </div>
  );
};

export default Footer;
