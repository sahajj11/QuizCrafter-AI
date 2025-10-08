import React, { useState } from 'react';
import { Zap, Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPageConsistent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // send login request to backend
      const res = await axios.post('http://localhost:5000/api/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.token) {
        // Save JWT token to local storage
        localStorage.setItem('token', res.data.token);

        alert('Login successful!');
        navigate('/dashboard'); // redirect to home
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left - Logo / App Name */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <Zap className="w-7 h-7 text-indigo-600" />
          <h1 className="text-2xl font-bold text-indigo-600">
            QuizCrafter <span className="text-gray-800">AI</span>
          </h1>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl border border-indigo-700/50">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Sign In to Your Account</h2>
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-lg font-semibold 
              bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 shadow-xl 
              hover:from-yellow-400 hover:to-amber-400 transition duration-300 transform hover:scale-[1.01]
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <LogIn className="w-5 h-5" />
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            New to QuizCrafter AI?
            <p
              onClick={() => navigate('/register')}
              className="font-semibold mt-1 text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150 cursor-pointer"
            >
              Create an account
            </p>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPageConsistent;
