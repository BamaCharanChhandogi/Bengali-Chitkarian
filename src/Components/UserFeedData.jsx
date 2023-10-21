import React from "react";
// import "../App.css";
function UserFeedData(props) {
  return (
    <div className="w-1/2 p-4 mx-3 bg-gray-200 rounded shadow-md cursor-pointer border-r-4 border-b-4 border-indigo-500">
      <img src={props.profileImg} alt="Profile Avatar" className="w-32 h-32 rounded-full mx-auto" />
      <h3>{props.firstName}</h3>
      {/* <a href={props.bioUrl} target="_blank" rel="noopener noreferrer">
        Visit Profile
      </a> */}
    </div>
  );
}

export default UserFeedData;
