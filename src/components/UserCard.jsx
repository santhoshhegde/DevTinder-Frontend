import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{age + " " + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
