import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';
import Main from './Components/Main';
import { auth } from './firebase';

function App() {
  const user  = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        // user is logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      }else{
        // user is logged out
        dispatch(logout());
      }
    })
  },[dispatch]);
  return (
    <div className='App'>
      {user ? <Main /> : <Login />}
    </div>
  );
}
export default App;
