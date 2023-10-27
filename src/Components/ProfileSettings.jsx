import React, { useEffect, useState } from 'react';
import db, { auth } from '../firebase';
import { Button } from '@material-tailwind/react';

function ProfileSettings(props) {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({}); // Store edited data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        db.collection('users')
          .doc(props.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setUserData(doc.data());
            } else {
              console.log("No such document!");
            }
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [props.id]);

  const deleteUser = () => {
    db.collection('users')
      .doc(props.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        auth.signOut();
        auth.currentUser.delete().then(() => {
          console.log("User successfully deleted!");
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleEdit = () => {
    // Enable edit mode and populate editedUserData with the current data
    setEditMode(true);
    setEditedUserData(userData);
  };

  const handleSave = () => {
    // Update the user data in Firebase with editedUserData
    db.collection('users')
      .doc(props.id)
      .update(editedUserData)
      .then(() => {
        console.log("Document successfully updated!");
        setUserData(editedUserData); // Update the displayed data
        setEditMode(false); // Switch back to view mode
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  return (
    <div className='mx-2 my-2 bg-gray-900 p-4 md:p-8 lg:p-6 rounded'>
      <div>
        {userData && !editMode && (
          <div className='flex flex-col gap-y-2 items-center sm:block'>
            <div>
              <h1 className='text-2xl text-white sm:text-3xl'> নমস্কার, {userData.firstName}</h1>
            </div>
            <div className='flex flex-col gap-y-1 items-center justify-center text-center'>
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
            <Button className='my-5 mx-5 px-2 max-w-sm bg-pink-700' onClick={deleteUser}>
              Delete Your Account
            </Button>
            <Button className='my-5 mx-5 px-2 max-w-sm bg-blue-700' onClick={handleEdit}>
              Edit Profile
            </Button>
          </div>
        )}

        {editMode && (
          <div>
            <div className='flex flex-col gap-y-1 items-center justify-center'>
              <img
                className='rounded-full w-32 h-32'
                src={editedUserData.profilePicture}
                alt={editedUserData.firstName}
              />
              <input
                type='text'
                name='firstName'
                value={editedUserData.firstName}
                className='p-1 rounded'
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='lastName'
                className='p-1 rounded'
                value={editedUserData.lastName}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='email'
                className='p-1 rounded'
                value={editedUserData.email}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='gender'
                className='p-1 rounded'
                value={editedUserData.gender}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='district'
                className='p-1 rounded'
                value={editedUserData.district}
                onChange={handleInputChange}
              />
            </div>
            <Button className='my-5 mx-5 px-2 bg-green-700' onClick={handleSave}>
              Save Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;