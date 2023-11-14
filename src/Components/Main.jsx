import React, { useEffect, useState } from "react";
import db, { auth } from "../firebase";
import Navbar from "./Navbar";
import UserFeed from "./UserFeed";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserDetails from "./UserDetails";
import ProfileSettings from "./ProfileSettings";
import About from "./About";
import Contact from "./Contact";
import SearchFeed from "./SearchFeed";

function Main() {
  const [userFeed, setUserFeed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

    // Call fetchUserData when the component mounts
    fetchUserData();

    // No need to return anything here, useEffect doesn't expect a return value
  }, []);
  const currentUser = userFeed.find((user) => user.id === auth.currentUser.uid);
  return (
    <div className="Main">
      <Router>
        <Navbar
          firstName={currentUser?.data.firstName}
          profileImg={currentUser?.data.profilePicture}
          onSearch={(query) => setSearchQuery(query)}
        />
        <Routes>
          <Route path="/" element={<UserFeed data={userFeed} />} />
          <Route
            path="/search"
            element={<SearchFeed data={userFeed} searchQuery={searchQuery} />}
          />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={<ProfileSettings id={auth.currentUser.uid} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Main;
