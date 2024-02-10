import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/counter/userSlice";
import Main from "./Components/Main";
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Main />
    </div>
  );
}
export default App;
