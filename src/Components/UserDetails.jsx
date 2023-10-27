  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import db from '../firebase';

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
      <div className='mx-2 my-2 bg-gray-900 p-4 md:p-8 lg:p-6 rounded'>
        {userData ? (
          <div className='flex flex-col gap-y-1 items-center justify-center'>
              <img
                className='rounded-full w-32 h-32'
                src={userData.profilePicture}
                alt={userData.firstName}
              />
              <h1 className='text-2xl text-white'>Name: {userData.firstName} {userData.lastName}</h1>
              <h2 className='text-xl text-white'>email: {userData.email}</h2>
              <h3 className='text-xl text-white'>Gender: {userData.gender}</h3>
              <h3 className='text-xl text-white'>District: {userData.district}</h3>
            </div>
        ) : (
          <p className='text-3xl my-8 text-center font-bold text-white'>Loading user data...</p>
        )}
      </div>
    );
  }

  export default UserDetails;
