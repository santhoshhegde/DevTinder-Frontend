import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return;
  return (
    <div className="mt-4">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
