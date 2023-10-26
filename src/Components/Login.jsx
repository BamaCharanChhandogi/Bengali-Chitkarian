import React, { useState } from 'react';
import SignUp from './SignUp';
import { auth } from '../firebase';

function Login() {
    const [isSignUp, setIsSignUpVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
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
            {!isSignUp ? (
                <div className="flex justify-center mt-10">
                    <div className="bg-white border border-gray-300 rounded-lg w-80 max-w-screen-lg sm:w-96 p-6">
                        <h2 className="text-xl font-bold text-blue-gray mb-1">Sign In</h2>
                        <p className="text-gray font-normal mb-2">Nice to meet you! Enter your details to see your friends.</p>
                        <form className="mt-6 mb-2">
                            <div className="mb-6">
                                <label htmlFor="email" className="text-blue-gray font-medium block mb-1">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-70 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="text-blue-gray font-medium block mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-70 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <label className="block mb-3">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-gray font-normal">I agree the <a href="#" className="font-medium text-blue-gray hover:text-gray-900">Terms and Conditions</a></span>
                            </label>
                            <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600" onClick={login}>Sign In</button>
                            <p className="mt-4 text-gray text-center font-normal">Don't have an account? <a href='#' className="font-medium text-gray-900" onClick={() => setIsSignUpVisible(true)}>Sign Up</a></p>
                        </form>
                    </div>
                </div>
            ) : <SignUp />}
        </>
    );
}

export default Login;
