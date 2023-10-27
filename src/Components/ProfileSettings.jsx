import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebase'
import { Button } from '@material-tailwind/react';
function ProfileSettings(props) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        db.collection('users').doc(props.id).get().then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setUserData(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
        // You can set this data in your state or perform any other operations
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    return () => {
      fetchUserData();
    };
  }, []);
  const deleteUser = () =>{
    db.collection('users').doc(props.id).delete().then(() => {
      console.log("Document successfully deleted!");
      auth.signOut();
      auth.currentUser.delete().then(() => {
        console.log("User successfully deleted!");
      })
      // history.push('/login');
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  return (
    <div className='mx-2 my-2 bg-gray-900 p-4 md:p-8 lg:p-6 rounded'>
    <div>
      {userData && (
        <div>
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <img className='rounded-full w-32 h-32' src={userData.profilePicture} alt={userData.firstName} />
            <h1 className='text-2xl text-white'>Name: {userData.firstName} {userData.lastName}</h1>
            <h2 className='text-xl text-white'>email: {userData.email}</h2>
            {/* <h3 className='text-xl text-white'>Gender: {userData.bio}</h3> */}
            <h3 className='text-xl text-white'>Gender: {userData.gender}</h3>
            <h3 className='text-xl text-white'>District: {userData.district}</h3>
          </div>
        </div>
      )}
    </div>
    <Button className='my-5 mx-5 px-2 bg-pink-700' onClick={deleteUser}>
      Delete Your Account
    </Button>
  </div>
  )
}

export default ProfileSettings
