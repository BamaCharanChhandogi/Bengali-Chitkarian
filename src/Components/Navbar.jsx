import React from 'react';
import {
    Avatar,
    Button,
    Input,
  } from "@material-tailwind/react";
import { auth } from '../firebase';
const Navbar = (props) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Bengali-Chitkarian</div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label="Type here..."
            // className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
        <ul className="flex space-x-4 justify-center">
          <li>
            <a href="/" className="text-white hover:text-blue-200">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-200">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-200">Contact</a>
          </li>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
