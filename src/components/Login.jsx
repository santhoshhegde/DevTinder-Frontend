import axios from "axios";
import React, { useState } from "react";
import { baseURL, API_ENDPOINTS } from "../utils/apiConstants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("ganapathi@kilasa.in");
  const [password, setPassword] = useState("Ladoo@anything/0");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
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

  const handleSingup = async () => {
    try {
      const res = await axios.post(
        baseURL + API_ENDPOINTS.signUp,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      navigate("/profile");
      dispatch(addUser(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center mt-[10%]">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="input"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="input"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  className="input"
                  placeholder="Type here"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="input"
              placeholder="Type here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              className="input"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="m-auto text-l text-red-600 font-bold">{error}</p>
            )}
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLogin ? handleLogin : handleSingup}
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
            <p
              className="text-center cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "New user? SignUp" : " I have account? Login"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
