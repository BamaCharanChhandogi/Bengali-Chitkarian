import React from "react";
import UserFeedData from "./UserFeedData";

function SearchFeed(props) {
  if (props.data.length === 0) {
    return <p className="text-xl my-8 text-center font-bold">Loading...</p>;
  }
  if (props.searchQuery === "") {
    return (
      <p className="text-xl my-8 text-center font-bold">
        Please enter a name of any bengali user
      </p>
    );
  }
  const filteredData = props.searchQuery
    ? props.data.filter((user) =>
        user.data.firstName
          .toLowerCase()
          .includes(props.searchQuery.toLowerCase())
      )
    : "";
  if (filteredData.length === 0) {
    return (
      <p className="text-xl my-8 text-center font-bold">
        No matching users found.
      </p>
    );
  }
  return (
    <div className="container mx-auto mt-3">
      <h2 className="text-center my-2 w-2/3 mx-auto p-1 text-xl sm:text-2xl font-bold border-b-2 sm:w-1/3 rounded border-pink-600">
        Search Results
      </h2>
      <div className="flex flex-wrap bg-gray-900 sm:py-8 sm:mx-4 px-2 rounded ">
        {filteredData.map((user) => {
          const { id, data } = user;
          return (
            <UserFeedData
              id={id}
              profileImg={data.profilePicture}
              firstName={data.firstName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchFeed;
