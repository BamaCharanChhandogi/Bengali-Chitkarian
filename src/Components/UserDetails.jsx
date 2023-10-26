  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import db from '../firebase';
  import { Navbar } from '@material-tailwind/react';

  function UserDetails() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
      // Fetch user data when the component mounts
      db.collection('users')
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Data exists, update the state
            setUserData(doc.data());
          } else {
            // Handle the case where the document doesn't exist
            console.log('User not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }, [id]);

    return (
      <div className='container mx-auto p-4'>
        {userData ? (
          <div className='flex flex-col items-center '>
            <img src={userData.profilePicture} alt={userData.firstName} 
            className="w-44 h-44  sm:w-52 sm:h-52 md:w-72 md:h-72 rounded mx-auto object-cover"
            />
            <h2 className='text-2xl sm:test-3xl md:text-4xl font-bold mt-4'>{userData.firstName}</h2>
            {/* Display other user details as needed */}
            <h2 className='text-lg sm:text-xl md:text-2xl mt-2'>{userData.district}</h2>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    );
  }

  export default UserDetails;
