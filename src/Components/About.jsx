import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-900 p-4 md:p-8 lg:p-6">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-4 md:p-8 lg:p-12">
        <h2 className="text-2xl font-bold mb-4">
          About <span className="text-pink-600">Bengali-Chitkarian</span>
        </h2>
        <p className="mb-4">
          Welcome to Bengali-Chitkarian - Your Chitkara Bengali Hub!
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Our Story</h3>
          <p>
            I'm a Bengali student at Chitkara University, Punjab, and I've
            noticed that we have a strong Bengali presence here. That's why I
            created Bengali-Chitkarian to help all Bengali students at Chitkara
            connect and support each other.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p>
            Our goal is simple: to bring all Chitkara Bengali students together
            in one place. We want to create a sense of community, celebrate our
            culture, and make new friends.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">What We Offer</h3>
          <p>
            At Bengali-Chitkarian, you can register and create your profile.
            Your profile will be visible on our site, making it easy to connect
            with other Bengali students. You can:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Meet fellow Bengali students, share experiences, and make friends
              who understand your background.
            </li>
            <li>
              Explore Bengali traditions and connect with others who share your
              interests.
            </li>
            <li>Build a network of academic and personal support.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Join Us Today!</h3>
          <p>
            Become a part of our growing Chitkara Bengali community. Let's
            celebrate our culture and make lasting friendships. Join us now!
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p>
            If you have questions or suggestions,{" "}
            <Link to="/contact" className="text-blue-500 hover:underline">
              contact us
            </Link>
            . We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
