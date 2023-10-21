import React, { useState } from 'react';
import {
    Avatar,
    Button,
  } from "@material-tailwind/react";
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
const Navbar = (props) => {
  const [query,setQuery] = useState('');
  return (
    <nav className="bg-pink-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
        <Link to="/" className="text-white text-2xl font-bold">Bengali-Chitkarian</Link>
        </div>
        <div className="flex items-center">
        <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <button className="px-4 text-white bg-black rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div className='flex items-center space-x-3'>
        <ul className="flex space-x-4">
          <li>
          <Link to="/" className="text-white hover:text-blue-200 text-xl font-bold">Home</Link>
          </li>
          <li>
          <Link to="/about" className="text-white hover:text-blue-200 text-xl font-bold">About</Link>
          </li>
          <li>
            <Link to="/Contact" className="text-white hover:text-blue-200 text-xl font-bold">Contact</Link> 
          </li>
          </ul>
          <div>
        <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={props.profileImg}
          />
        </div>
        <div onClick={()=>{auth.signOut()}} className='logout-btn'>
            <Button>Log Out</Button>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
