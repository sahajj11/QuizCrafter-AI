import React from 'react';
import { Zap, Mail, Lock, LogIn, Link } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPageConsistent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt...');
    // Add your authentication logic here

  };

  const navigate=useNavigate()

  return (
    <>
     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          
          {/* Left - Logo / App Name */}
          <div onClick={()=>navigate("/")} className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-indigo-600" />
            <h1 className="text-2xl font-bold text-indigo-600">
              QuizCrafter <span className="text-gray-800">AI</span>
            </h1>
          </div>
    
          
        </nav>
   
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4">
        
    

      {/* Login Card - Styled to stand out against the dark background */}
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl border border-indigo-700/50">
        
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Sign In to Your Account
        </h2>
        <p className="text-gray-400 mb-8 text-center text-sm">
          Continue your quiz crafting journey!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
          </div>

          

          {/* Primary Login Button (Consistent with Landing Page CTA) */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-lg font-semibold 
                       bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 shadow-xl 
                       hover:from-yellow-400 hover:to-amber-400 transition duration-300 transform hover:scale-[1.01]"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          
        </div>

       

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-400">
          New to QuizCrafter AI?
          <p onClick={()=>navigate("/register")} className="font-semibold mt-1 text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150">
            Create an account
          </p>
        </p>
      </div>
      
    </div>
    
    </>
  );
};

export default LoginPageConsistent;