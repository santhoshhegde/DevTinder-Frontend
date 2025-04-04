import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS, baseURL } from "../utils/apiConstants";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const res = await axios.get(baseURL + API_ENDPOINTS.connections, {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      setConnections(res?.data?.data);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return <h1>Loading</h1>;
  if (connections.length == 0)
    return <p className="text-center">No user found</p>;
  return (
    <div>
      {connections.map((connection) => (
        <ConnetionCard connection={connection} key={connection._id} />
      ))}
    </div>
  );
};

export default Connections;

const ConnetionCard = ({ connection }) => {
  return (
    <div className="border flex w-1/2 shadow-lg mt-5 gap-9 p-2 items-center m-2">
      <div>
        <img src={connection.photoUrl} className="w-24 h-24 rounded-full" />
      </div>
      <div>
        <h2 className="font-bold">{connection?.firstName}</h2>
        <h2>{connection.age}</h2>
        <h2>{connection.gender}</h2>
        <h3>{connection.about}</h3>
      </div>
    </div>
  );
};
