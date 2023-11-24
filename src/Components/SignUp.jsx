import React, { useState } from "react";
import db, { auth, storage } from "../firebase";
import Login from "./Login";
import districtSubdistrictMapping from "../District";

function SignUp() {
  const [step, setStep] = useState(1);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [course, setCourse] = useState("");
  const [graduation, setGraduation] = useState("");
  const [year, setYear] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const submitSignUp = (e) => {
    e.preventDefault();
    // Check if any of the required fields is empty
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !gender ||
      !district ||
      !subdistrict ||
      !course ||
      !graduation ||
      !year ||
      !profilePicture
    ) {
      alert("Please fill in all the required fields");
      return;
    }
    if (!checkbox) {
      alert("Please accept the terms and conditions");
      return;
    }
    // Your user registration code here
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          const profilePictureRef = storage.ref(
            `profile_pictures/${authUser.user.uid}`
          );
          profilePictureRef.put(profilePicture).then(() => {
            profilePictureRef.getDownloadURL().then((url) => {
              db.collection("users").doc(authUser.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                email: email,
                profilePicture: url,
                district: district,
                subdistrict: subdistrict,
                course: course,
                graduation: graduation,
                year: year,
              });
            });
          });
        }
      })
      .catch((err) => {
        alert(err);
        alert("Please try again");
      });

    // Move to the next step when registration is successful
    setStep(step + 1);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  const handleCheckBox = (e) => {
    setCheckBox(!checkbox);
  };
  const goToNextStep = () => {
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          // First step of registration form
          <form className="mt-5 mb-2 w-max mx-auto">
            <div className="mb-1 flex flex-col gap-6 w-72">
              <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                First Name
              </h2>
              <input
                type="text"
                className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                Last Name
              </h2>
              <input
                type="text"
                className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                Your Email
              </h2>
              <input
                type="email"
                className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                placeholder="name@email.com"
                required
                value={email}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full py-3 my-1 bg-pink-500 text-white rounded-lg hover-bg-pink-600"
              onClick={goToNextStep}
            >
              Next
            </button>
          </form>
        );
      case 2:
        return (
          // Second step of registration form
          <form className="mt-5 mb-2 w-max mx-auto">
            <div className="flex flex-col gap-6 w-72">
              <h2 className="text-lg font-semibold text-blue-gray-800 -mb-2">
                Your Gender
              </h2>
              <select
                className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <h2 className="text-lg font-semibold text-blue-gray-800 -mb-4 -mt-4">
                Your State
              </h2>
              <input
                type="text"
                className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                value="West Bengal"
                readOnly
              />
              <h2 className="text-lg font-semibold text-blue-gray-800 -mt-3">
                Your District
              </h2>
              <select
                className="w-72 border border-blue-gray-200 p-2 rounded-lg -mt-4 mb-1"
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
              >
                <option value="">Select your district</option>
                <option value="Alipurduar">Alipurduar</option>
                <option value="Bankura">Bankura</option>
                <option value="Birbhum">Birbhum</option>
                <option value="CoochBehar">Cooch Behar</option>
                <option value="DakshinDinajpur">Dakshin Dinajpur</option>
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
                <option value="North24Parganas">North 24 Parganas</option>
                <option value="PaschimBardhaman">Paschim Bardhaman</option>
                <option value="PurbaBardhaman">Purba Bardhaman</option>
                <option value="PurbaMedinipur">Purba Medinipur</option>
                <option value="PaschimMedinipur">Paschim Medinipur</option>
                <option value="Purulia">Purulia</option>
                <option value="South24Parganas">South 24 Parganas</option>
                <option value="UttarDinajpur">Uttar Dinajpur</option>
                {/* Add more district options here */}
              </select>
              {district && (
                <>
                  <h2 className="text-lg font-semibold text-blue-gray-800 -my-2 -mt-4">
                    Your Subdistrict
                  </h2>
                  <select
                    className="w-72 border border-blue-gray-200 p-2 rounded-lg mb-3 -mt-3"
                    onChange={(e) => setSubdistrict(e.target.value)}
                    value={subdistrict}
                  >
                    <option value="">Select your subdistrict</option>
                    {districtSubdistrictMapping[district].map(
                      (subdistrictName) => (
                        <option key={subdistrictName} value={subdistrictName}>
                          {subdistrictName}
                        </option>
                      )
                    )}
                  </select>
                </>
              )}
            </div>
            <div>
              <button
                className="w-full py-3 my-1 bg-pink-500 text-white rounded-lg hover-bg-pink-600"
                onClick={goToNextStep}
              >
                Next
              </button>
              <button
                className="w-full py-3 my-1 bg-blue-500 text-white rounded-lg hover-bg-blue-600"
                onClick={goToPreviousStep}
              >
                Previous
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          // Third step of registration form
          <form className="mt-5 mb-2 w-max mx-auto">
            <div className="flex flex-col gap-6 w-72">
              <h2 className="text-lg font-semibold text-blue-gray-800 -mb-5">
                Select Course
              </h2>
              <select
                className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                onChange={(e) => setCourse(e.target.value)}
                value={course}
              >
                <option value="">Select your course</option>
                <option value="CSE-AI">CSE in AI</option>
                <option value="CSE">Computer Science & Engineering</option>
                <option value="B.Pharm">B. Pharm</option>
                <option value="Pharm. D">Pharm. D</option>
              </select>
              <div>
                <h2 className="text-lg font-semibold text-blue-gray-800 -mt-4 mb-2">
                  Graduation
                </h2>
                <select
                  className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                  onChange={(e) => setGraduation(e.target.value)}
                  value={graduation}
                >
                  <option value="">Graduated Or Not</option>
                  <option value="Running">Running</option>
                  <option value="Graduated">Already Graduated</option>
                </select>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-gray-800 -mt-4 mb-2">
                  Current Year
                </h2>
                <select
                  className="w-72 border border-blue-gray-200 p-2 rounded-lg"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
                  <option value="">Current Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
              <h2 className="text-lg font-semibold text-blue-gray-800 -mt-4 -mb-4">
                Profile Picture
              </h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="my-5 md:mt-10">
              <input
                type="checkbox"
                className="mr-2"
                required
                value={checkbox}
                onClick={handleCheckBox}
              />
              <label htmlFor="agreeTerms" className="text-gray-500">
                I agree to the
                <button className="text-blue-gray-800 hover:text-gray-900 font-semibold">
                  &nbsp;Terms and Conditions
                </button>
              </label>
            </div>
            <button
              className="w-full py-3 my-1 bg-pink-500 text-white rounded-lg hover-bg-pink-600"
              onClick={submitSignUp}
            >
              Sign Up
            </button>
            <div>
              <button
                className="w-full py-3 my-1 bg-blue-500 text-white rounded-lg hover-bg-blue-600"
                onClick={goToPreviousStep}
              >
                Previous
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!isSignInVisible ? (
        <>
          <div className="flex justify-center w-full align-center">
            <div className="Card mt-2 w-max">
              <h1 className="text-3xl font-bold text-center text-blue-gray-800 border-b-2 pb-2 border-pink-600 rounded">
                Sign Up
              </h1>
              {renderStep()}
              <p className="mt-1 text-center text-gray-500">
                Already have an account?{" "}
                <button
                  className="text-blue-gray-800 font-semibold cursor-pointer"
                  onClick={() => setIsSignInVisible(true)}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default SignUp;
