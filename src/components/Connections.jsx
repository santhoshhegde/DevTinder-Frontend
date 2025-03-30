import React from "react";
import { useSelector } from "react-redux";

const Connections = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <div className="border flex w-1/2 shadow-lg mt-5 gap-9 p-2 items-center m-2">
        <div>
          <img src={user.photoUrl} className="h-24 rounded-full" />
        </div>
        <div>
          <h2 className="font-bold">{user.firstName}</h2>
          <h2>{user.age}</h2>
          <h2>{user.gender}</h2>
          <h3>{user.about}</h3>
        </div>
      </div>
    </div>
  );
};

export default Connections;
