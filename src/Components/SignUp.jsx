import React, { useState } from "react";
import db, { auth, storage } from "../firebase";
import Login from "./Login";
function SignUp() {
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const submitSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          const profilePictureRef = storage.ref(`profile_pictures/${authUser.user.uid}`);
          profilePictureRef.put(profilePicture)
          .then(()=>{
            profilePictureRef.getDownloadURL().then((url) =>{
              db.collection("users").doc(authUser.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                email: email,
                profilePicture: url,
                district: district,
              });
            });
          });
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setGender("");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <>
      {!isSignInVisible ? (
        <>
          <div className="flex justify-center w-full align-center">
            <div className="Card mt-2 w-max">
              <h1 className="text-3xl font-bold text-center text-blue-gray-800">
                Sign Up
              </h1>
              <p className="text-center text-gray-500">
                Nice to meet you! Enter your details to connect with your Bengali friends.
              </p>
              <form className="mt-5 mb-2 w-max">
                <div className="flex gap-6">
                  <div className="mb-1 flex flex-col gap-6 w-72">
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Your Name
                    </h2>
                    <input
                      type="text"
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      placeholder="First Name"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Your Gender
                    </h2>
                    <select
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Your Email
                    </h2>
                    <input
                      type="email"
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      placeholder="name@email.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Password
                    </h2>
                    <input
                      type="password"
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      placeholder="********"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-6 w-72">
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Last Name
                    </h2>
                    <input
                      type="text"
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      placeholder="Last Name"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Your State
                    </h2>
                    <input
                      type="text"
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      value="West Bengal"
                      readOnly
                    />
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Your District
                    </h2>
                    <select
                      className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option value="">Select your district</option>
                      <option value="Alipurduar">Alipurduar</option>
                      <option value="Bankura">Bankura</option>
                      <option value="Birbhum">Birbhum</option>
                      <option value="Cooch Behar">Cooch Behar</option>
                      <option value="Dakshin Dinajpur">Dakshin Dinajpur</option>
                      <option value="Darjeeling">Darjeeling</option>
                      <option value="Hooghly">Hooghly</option>
                      <option value="Howrah">Howrah</option>
                      <option value="Jalpaiguri">Jalpaiguri</option>
                      <option value="Jhargram">Jhargram</option>
                      <option value="Kalimpong">Kalimpong</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Malda">Malda</option>
                      <option value="Murshidabad">Murshidabad</option>
                      <option value="Nadia">Nadia</option>
                      <option value="North 24 Parganas">
                        North 24 Parganas
                      </option>
                      <option value="Paschim Bardhaman">
                        Paschim Bardhaman
                      </option>
                      <option value="Purba Bardhaman">Purba Bardhaman</option>
                      <option value="Purba Medinipur">Purba Medinipur</option>
                      <option value="Purulia">Purulia</option>
                      <option value="South 24 Parganas">
                        South 24 Parganas
                      </option>
                      <option value="Uttar Dinajpur">Uttar Dinajpur</option>
                      {/* Add more district options here */}
                    </select>
                    <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                      Profile Picture
                    </h2>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="agreeTerms" className="text-gray-500">
                    I agree to the
                    <button
                      className="text-blue-gray-800 hover:text-gray-900 font-semibold"
                    >
                      &nbsp;Terms and Conditions
                    </button>
                  </label>
                </div>
                <button
                  className="w-full py-3 m-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  onClick={submitSignUp}
                >
                  Sign Up
                </button>
                <p className="mt-4 text-center text-gray-500">
                  Already have an account?{" "}
                  <button
                    className="text-blue-gray-800 font-semibold cursor-pointer"
                    onClick={() => setIsSignInVisible(true)}
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        // Render your login component here
        <Login/>
      )}
    </>
  );
}

export default SignUp;
