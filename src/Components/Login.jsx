import React, { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import SignUp from './SignUp';
import { auth } from '../firebase';
function Login() {
    const [isSignUp, setIsSignUpVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = (e) => {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
        .then((auth)=>{
          if(auth){
            console.log(auth);
            setEmail("");
            setPassword("");
          }
        })
        .catch((err)=>{
          alert(err);
        });
    }
  return (
    <>
     {!isSignUp ? (
     <>
     <div className='flex justify-center mt-10'>
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Sign In
     </Typography>
     <Typography color="gray" className="mt-1 font-normal">
       Nice to meet you! Enter your details to see your friends.
     </Typography>
     <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
       <div className="mb-1 flex flex-col gap-6">
         <Typography variant="h6" color="blue-gray" className="-mb-3">
           Your Email
         </Typography>
         <Input
           label='Name'
           className="w-70"
           required
           onChange={(e)=>setEmail(e.target.value)}
         />
         <Typography variant="h6" color="blue-gray" className="-mb-3">
           Password
         </Typography>
         <Input
           type="password"
           label="********"
           className="w-70"
           required
           onChange={(e)=>setPassword(e.target.value)}
         />
       </div>
       <Checkbox
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
       <Button className="mt-6" fullWidth onClick={login}>
         sign In
       </Button>
       <Typography color="gray" className="mt-4 text-center font-normal">
         Don't have account?{" "}
         <a href='#' className="font-medium text-gray-900" onClick={()=>setIsSignUpVisible(true)}>
           Sign Up
         </a>
       </Typography>
     </form>
   </Card>
    </div>
     </>) : <SignUp/>}
    </>
 );
}

export default Login;
