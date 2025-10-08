import React from "react";
import { User, Mail, Lock, UserPlus,Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect with backend register API
  };

  const navigate=useNavigate()

  return (

    <>

    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          
         
          <div onClick={()=>navigate("/")} className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-indigo-600" />
            <h1 className="text-2xl font-bold text-indigo-600">
              QuizCrafter <span className="text-gray-800">AI</span>
            </h1>
          </div>
    
          
        </nav>

    <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl border border-indigo-700/50 mx-auto mt-16">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Create Your Account
      </h2>
      <p className="text-gray-400 mb-8 text-center text-sm">
        Join QuizCrafter AI today!
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              required
              placeholder="Enter your username"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-lg font-semibold 
            bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl 
            hover:from-indigo-400 hover:to-purple-400 transition duration-300 transform hover:scale-[1.01]"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create Account</span>
        </button>
      </form>

      {/* Sign In Link */}
      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?
        <p onClick={()=>navigate("/login")} className="font-semibold text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150">
          Sign In
        </p>
      </p>
    </div>
    </>
  );
};

export default SignUp;
