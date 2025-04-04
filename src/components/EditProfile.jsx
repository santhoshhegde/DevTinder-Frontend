import React, { useEffect, useRef, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { API_ENDPOINTS, baseURL } from "../utils/apiConstants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || 0);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const toastTimeout = useRef(null);

  useEffect(() => {
    return () => clearTimeout(toastTimeout.current);
  }, []);

  const handleSaveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        baseURL + API_ENDPOINTS.editProfile,
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      toastTimeout.current = setTimeout(() => setShowToast(false), 1000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  return (
    <div className="flex justify-evenly">
      <div className="card bg-base-100 w-96 shadow-sm p-2 flex items-center justify-center mb-4">
        <h2 className="font-bold">Edit Profile</h2>
        <label
          className="form-control w-full max-w-xs my-2"
          htmlFor="firstName"
        >
          FirstName:
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="form-control w-full max-w-xs my-2" htmlFor="lastName">
          LastName:
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="form-control w-full max-w-xs my-2" htmlFor="age">
          age:
        </label>
        <input
          id="age"
          type="text"
          value={age}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="form-control w-full max-w-xs my-2" htmlFor="gender">
          Gender:
        </label>
        <input
          id="gender"
          type="text"
          value={gender}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="form-control w-full max-w-xs my-2" htmlFor="photoUrl">
          Photo URL:
        </label>
        <input
          id="photoUrl"
          type="text"
          value={photoUrl}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="form-control w-full max-w-xs my-2" htmlFor="about">
          About:
        </label>
        <input
          id="about"
          type="text"
          value={about}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setAbout(e.target.value)}
        />
        <p className="text-red-600">{error}</p>
        <button className="btn btn-primary mt-4" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
      <div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
          showButton={false}
        />
      </div>

      {showToast && (
        <div className="fixed top-4 z-50 bg-green-400 p-3 rounded-xl shadow-lg">
          <span>Profile updated sucessfully.</span>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
