import React from "react";
import "../App.css";
import UserFeedData from "./UserFeedData";
function UserFeed(props) {
  return (
    <div className="flex flex-col">
      <h2 className="text-center my-2 p-1 text-2xl font-bold">Top Bengali Profiles</h2>
      <div className="flex">
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
