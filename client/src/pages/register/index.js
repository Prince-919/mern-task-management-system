import React, { useState } from "react";
import { AuthButton } from "../../components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${window.location.origin}/api/register`, inputs)
      .then((response) => {
        toast.success(response.data.message);
        setInputs({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="register">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="register_left col-lg-8 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-75 p-5">
              <input
                className="p-2 my-3 custom_input"
                type="text"
                name="username"
                placeholder="username "
                value={inputs.username}
                onChange={handleInput}
              />
              <input
                className="p-2 my-3 custom_input"
                type="email"
                name="email"
                placeholder="email"
                value={inputs.email}
                onChange={handleInput}
              />
              <input
                className="p-2 my-3 custom_input"
                type="password"
                name="password"
                placeholder="password"
                value={inputs.password}
                onChange={handleInput}
              />
              <button
                className="btn btn-primary p-2 my-3"
                onClick={handleSubmit}>
                Sign up
              </button>
            </div>
          </div>
          <div className=" text-center register_right col-lg-4 d-flex justify-content-center align-items-center">
            <AuthButton first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
