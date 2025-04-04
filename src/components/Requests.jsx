import React from "react";
import { useEffect } from "react";
import { baseURL, API_ENDPOINTS } from "../utils/apiConstants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeReviewedRequest } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const getRequests = async () => {
    try {
      const res = await axios.get(baseURL + API_ENDPOINTS.requests, {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRequestClick = async (requestId, status) => {
    try {
      const res = await axios.post(
        baseURL + API_ENDPOINTS.reviewRequest + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeReviewedRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!request)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  if (request.length == 0)
    return <h1 className="text-center">No connections</h1>;
  return (
    <div>
      {request.map((req) => {
        const { _id, photoUrl, firstName, lastName, about } = req?.fromUserId;
        return (
          <div
            key={_id}
            className="flex flex-wrap justify-evenly max-w-lg border p-2 bg-base-300 mx-auto my-2 items-center rounded-lg "
          >
            <div>
              <img src={photoUrl} className="h-24 w-24 rounded-full" />
            </div>
            <div>
              <h1 className="font-bold">{firstName + " " + lastName}</h1>
              <p>{about}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleRequestClick(req._id, "rejected");
                }}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleRequestClick(req._id, "accepted");
                }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
