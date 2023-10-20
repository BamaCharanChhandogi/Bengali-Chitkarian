import React, { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Login from './Login';
import {auth} from '../firebase'

function SignUp() {
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const submitSignUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <>
    {!isSignInVisible ? (
    <>
    <div className='flex justify-center mt-10'>
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Sign Up
     </Typography>
     <Typography color="gray" className="mt-1 font-normal" type='submit'>
       Nice to meet you! Enter your details to register.
     </Typography>
     <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
       <div className="mb-1 flex flex-col gap-6">
         <Typography variant="h6" color="blue-gray" className="-mb-3">
           Your Name
         </Typography>
         <Input
           size="lg"
           placeholder="name@mail.com"
           className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
           required
           onChange={(e)=>setName(e.target.value)}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
         <Typography variant="h6" color="blue-gray" className="-mb-3">
           Your Email
         </Typography>
         <Input
           size="lg"
           placeholder="name@mail.com"
           className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
           required
           onChange={(e)=>setEmail(e.target.value)}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
         <Typography variant="h6" color="blue-gray" className="-mb-3">
           Password
         </Typography>
         <Input
           type="password"
           size="lg"
           placeholder="********"
           className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
           required
           onChange={(e)=>setPassword(e.target.value)}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
       </div>
       <Checkbox
       required
         label={
           <Typography
             variant="small"
             color="gray"
             className="flex items-center font-normal"
           >
             I agree the
             <a
               href="#"
               className="font-medium transition-colors hover:text-gray-900"
             >
               &nbsp;Terms and Conditions
             </a>
           </Typography>
         }
         containerProps={{ className: "-ml-2.5" }}
       />
       <Button className="mt-6" fullWidth onClick={submitSignUp}>
         sign up
       </Button>
       <Typography color="gray" className="mt-4 text-center font-normal">
         Already have an account?{" "}
         <a href="#" className="font-medium text-gray-900" onClick={()=>setIsSignInVisible(true)}>
           Sign In
         </a>
       </Typography>
     </form>
   </Card>
    </div>
    </>) : <Login/>}
    </>
 );
}
export default SignUp;
