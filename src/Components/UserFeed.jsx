import React from "react";
import "../App.css";
import UserFeedData from "./UserFeedData";
function UserFeed(props) {
  return (
    <div className="container mx-auto">
      <h2 className="text-center my-2 p-1 text-xl sm:text-2xl font-bold">Top Bengali Profiles</h2>
      <div className="flex flex-wrap gap-y-4 gap-x-4 bg-gray-900 sm:py-8 sm:mx-4 rounded justify-center">
      {props.data.map((user) => {
        const { id, data } = user;
        return (
          <UserFeedData
            id={id}
            profileImg={data.profilePicture}
            firstName={data.firstName}
            bioUrl={data.district}
          />
        );
      })}
      </div>
    </div>
  );
}

export default UserFeed;
