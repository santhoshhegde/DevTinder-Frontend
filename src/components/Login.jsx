import axios from "axios";
import React, { useState } from "react";
import { baseURL, API_ENDPOINTS } from "../utils/apiConstants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("agni@bhramlokha.in");
  const [password, setPassword] = useState("Benki@anything/0");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        baseURL + API_ENDPOINTS.signIn,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center items-center mt-[10%]">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="input"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            className="input"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="m-auto text-l text-red-600 font-bold">{error}</p>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
