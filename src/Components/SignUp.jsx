import React, { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Login from "./Login";
import db, { auth, storage } from "../firebase";

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
  // Profile pic handle function
  const handleProfilePictureChange = (e)=>{
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  return (
    <>
      {!isSignInVisible ? (
        <>
          <div className="flex justify-center w-full align-center">
            <div className="Card mt-2 w-max">
              <Typography variant="h5" color="blue-gray" className="text-center">
                Sign Up
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal text-center"
                type="submit"
              >
                Nice to meet you! Enter your details to see your bengali friends.
              </Typography>
              {/* Name Input */}
              <form className="mt-5 mb-2 w-max">
                <div className="flex gap-6">
                  <div className="mb-1 flex flex-col gap-6 w-72">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Name
                    </Typography>
                    <Input
                      label="First Name"
                      className="w-70"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {/* Gender Input */}
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Gender
                    </Typography>
                    <select
                      className="border-t-blue-gray-200 focus:border-t-gray-900  rounded-lg"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {/* Email Input */}
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Email
                    </Typography>
                    <Input
                      label="name@email.com"
                      className="w-70"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* password Input */}
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Password
                    </Typography>
                    <Input
                      type="password"
                      label="********"
                      className="w-70"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-6 w-70">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Last Name
                    </Typography>
                    <Input
                      // placeholder="last name"
                      label="last name"
                      className="w-70"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {/* State Input */}
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                     Your State
                    </Typography>
                    <Input
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 focus:border-0 placeholder:border-0"
                    readOnly
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                     value={"West Bengal"}/>
                     
                    {/* District Input */}
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your District
                    </Typography>
                    <select
                      className="border-t-blue-gray-200 focus:border-t-gray-900 rounded-lg"
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
                    </select>
                    {/* pic Input */}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Profile Picture
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                  </div>
                </div>
                {/* CheckBox  */}
                <Checkbox
                  required
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree to the
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{
                    className: "-ml-2.5",
                  }}
                  errorMessage="You must agree to the Terms and Conditions."
                />

                <Button className="mt-6" fullWidth onClick={submitSignUp}>
                  sign up
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-900"
                    onClick={() => setIsSignInVisible(true)}
                  >
                    Sign In
                  </a>
                </Typography>
              </form>
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
