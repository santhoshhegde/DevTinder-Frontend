import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { API_ENDPOINTS, baseURL } from "../utils/apiConstants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";

function Body() {
  const dispacth = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      if (user) return;
      const res = await axios.get(baseURL + API_ENDPOINTS.profile, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispacth(addUser(res.data.data));
    } catch (err) {
      if (res.status === 401) {
        navigate(API_ENDPOINTS.signIn);
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Body;
