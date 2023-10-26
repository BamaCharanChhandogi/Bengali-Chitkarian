import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { Link } from "react-router-dom";
// import "../App.css";
function UserFeedData(props) {
  return (
    <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex flex-col bg-gray-200 rounded shadow-md cursor-pointer border-r-4 border-b-4 border-indigo-500">
   <Link to={`/user/${props.id}`}>
      <img
        src={props.profileImg}
        alt="Profile Avatar"
        className="w-32 h-32 rounded-full mx-auto object-cover"
      />
      <h3>{props.firstName}</h3>
    </Link>
    </div>
  );
}

export default UserFeedData;
