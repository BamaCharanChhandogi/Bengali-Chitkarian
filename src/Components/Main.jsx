import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebase'
import  Navbar  from './Navbar'
import UserFeed from './UserFeed';

function Main() {
  const [userFeed,setUserFeed] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = db.collection("users");
        const snapshot = await usersRef.get();
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setUserFeed(userData);
        // You can set this data in your state or perform any other operations
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    return () => {
      fetchUserData();
    };
  }, []);
  return (
    <div className='Main'>
    {
      userFeed.map((user) => {
        const { id, data } = user;
        if (id === auth.currentUser.uid) {
          return <Navbar firstName={data.firstName} profileImg={data.profilePicture} key={id} />;
        }
      })      
    }
    <UserFeed data={userFeed}/>
    </div>
  )
}

export default Main
