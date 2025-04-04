import axios from "axios";
import React from "react";
import { API_ENDPOINTS, baseURL } from "../utils/apiConstants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../store/feedSlice";

const UserCard = ({ user, showButton = true }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

  const handleRequest = async (userId, status) => {
    try {
      const res = await axios.post(
        baseURL + API_ENDPOINTS.sendRequest + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {showButton && (
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleRequest(_id, "ignored");
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleRequest(_id, "interested");
              }}
            >
              Intrested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
