import React from "react";
import { Link } from "react-router-dom";

function UserFeedData(props) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <Link to={`/user/${props.id}`}>
        <div className="relative overflow-hidden">
          <div className="flex flex-col items-center p-3 bg-gray-200 rounded shadow-md hover:border-pink-500 hover:cursor-pointer transition duration-300 relative">
            <img
              src={props.profileImg}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <h3 className="text-lg sm:text-xl mt-2 text-center">
              {props.firstName}
            </h3>
          </div>
          <div className="border-r-4 border-b-4 absolute right-0 bottom-0 border-transparent hover:border-pink-500 transition-all duration-200"></div>
        </div>
      </Link>
    </div>
  );
}

export default UserFeedData;
