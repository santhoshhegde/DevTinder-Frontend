import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { API_ENDPOINTS, baseURL } from "../utils/apiConstants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(baseURL + API_ENDPOINTS.feed, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return <div>Loading...</div>;
  return (
    <div className="flex flex-col justify-center items-center gap-10 w-screen">
      {feed.map((f) => (
        <UserCard user={f} />
      ))}
    </div>
  );
};

export default Feed;
