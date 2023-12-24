import React, { useState } from "react";
import { AuthButton } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const disparch = useDispatch();
  const [inputs, setInputs] = useState({
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
      .post(`${window.location.origin}/api/login`, inputs)
      .then((response) => {
        sessionStorage.setItem("id", response.data.others._id);
        disparch(authActions.login());
        navigate("/todo");
      });
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="text-center register_right col-lg-4 d-flex justify-content-center align-items-center">
            <AuthButton first="Sign" second="In" />
          </div>
          <div className="register_left col-lg-8 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-75 p-5">
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
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
