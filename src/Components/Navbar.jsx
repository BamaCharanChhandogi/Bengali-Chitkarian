import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = (props) => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-pink-600 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-gray-300 text-xl font-bold md:text-2xl">
            Bengali Chitkarian
          </Link>
        </div>
        <div className="hidden sm:flex items-center">
          <div className="flex space-x-1">
            <input
              value={query}
              type="text"
              className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="px-4 text-white bg-black rounded-full">
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
        <div className="hidden md:flex items-center">
          <ul className="hidden sm:flex space-x-4 text-white text-xl font-bold sm:text-2xl">
            <li>
              <Link
                to="/"
                className={`text-xl font-bold ${
                  location.pathname === "/" ? "text-black" : "text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`text-xl font-bold ${
                  location.pathname === "/about" ? "text-black" : "text-white"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`text-xl font-bold ${
                  location.pathname === "/contact" ? "text-black" : "text-white"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="pl-2">
            <Link to="/profile">
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border-2 border-gray-900 p-0.5 rounded-full w-10 h-10"
                src={props.profileImg}
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center md:hidden">
          <div className="pl-2">
            <Link to="/profile">
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border-2 border-gray-900 p-0.5 rounded-full w-10 h-10"
                src={props.profileImg}
              />
            </Link>
          </div>
          <div>
            {/* Mobile Menu Button */}
            <button
              className="block p-2 text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-1 mx-3">
          {/* Mobile Menu Content */}
          <ul className="font-medium p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <li>
              <Link
                to="/"
                className={` ${
                  location.pathname === "/"
                    ? "text-blue-700 font-bold"
                    : "text-black font-normal"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={` ${
                  location.pathname === "/about"
                    ? "text-blue-700 font-bold"
                    : "text-black font-normal"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={` ${
                  location.pathname === "/contact"
                    ? "text-blue-700 font-bold"
                    : "text-black font-normal"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
