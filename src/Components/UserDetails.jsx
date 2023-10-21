import React from 'react'

function UserDetails(Users) {
    // alert("User Details")
    return (
        <div>
          <h2>{Users.firstName}</h2>
          <img src={Users.profileImg} alt={Users.firstName} />
          <p>Price: ${Users.firstName}</p>
          <p>Description: {Users.firstName}</p>
          {/* Add more details as needed */}
        </div>
      );
}

export default UserDetails
