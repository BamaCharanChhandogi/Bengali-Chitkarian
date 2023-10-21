import React, { useState } from "react";
import UserDetails from "./UserDetails";
// import "../App.css";
function UserFeedData(props) {
    const [selectedUser, setSelectedUser] = useState(null);
    const handleShirtClick=(userDetails)=>{
        setSelectedUser(userDetails);
    }
  return (
    <div className="w-1/2 p-4 mx-3 bg-gray-200 rounded shadow-md cursor-pointer border-r-4 border-b-4 border-indigo-500" onClick={()=>handleShirtClick(props)}>
      <img src={props.profileImg} alt="Profile Avatar" className="w-32 h-32 rounded-full mx-auto" />
      <h3>{props.firstName}</h3>
      {/* <a href={props.bioUrl} target="_blank" rel="noopener noreferrer">
        Visit Profile
      </a> */}

      {
        selectedUser && <UserDetails Users={selectedUser}/>
      }
    </div>
  );
}

export default UserFeedData;
