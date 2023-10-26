import React from 'react'
import db, { auth } from '../firebase'
import { Button } from '@material-tailwind/react';
function ProfileSettings(props) {
  // const history = useHistory();
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
    <div className='mx-auto max-w-screen-md'>
      <Button className='my-5 mx-5' onClick={deleteUser}>Delete Your Account</Button>
      {/* <h2>Settings{props.id}</h2> */}
    </div>
  )
}

export default ProfileSettings
