import React from 'react';
import quizSvg from "../assets/quiz.svg"
import { useNavigate } from 'react-router-dom';



const Hero = () => {
    const navigate=useNavigate()
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        
        {/* Left Side - Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            QuizCrafter <span className="text-indigo-600">AI</span>:  
            <br />Your Smartest Way to Create Engaging Quizzes
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Harness the power of AI to generate custom quizzes, tests, 
            and trivia in minutes, not hours.
          </p>
          <button onClick={()=>navigate("/login")} className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Right Side - SVG Illustration */}
        <div className="flex-1 mt-12 md:mt-0 md:ml-10">
          <img 
            src={quizSvg} 
            alt="Quiz illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;