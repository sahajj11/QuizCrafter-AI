import React from 'react'
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    
    const navigate=useNavigate()
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Left - Logo / App Name */}
      <div onClick={()=>navigate("/")} className="flex items-center gap-2">
        <Zap className="w-7 h-7 text-indigo-600" />
        <h1 className="text-2xl font-bold text-indigo-600">
          QuizCrafter <span className="text-gray-800">AI</span>
        </h1>
      </div>

      {/* Right - Login */}
      <button  onClick={()=>navigate("/login")} className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        Login
      </button>
    </nav>
  )
}

export default Navbar
