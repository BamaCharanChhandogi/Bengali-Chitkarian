import React from "react";
import UserFeedData from "./UserFeedData";
function UserFeed(props) {
  return (
    <div className="container mx-auto mt-3">
      <h2 className="text-center my-2 p-1 text-xl sm:text-2xl font-bold">Top Bengali Profiles</h2>
      <div className="flex flex-wrap bg-gray-900 sm:py-8 sm:mx-4 px-2 rounded ">
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
