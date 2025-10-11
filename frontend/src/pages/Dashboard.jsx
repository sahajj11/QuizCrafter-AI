import React, { useState, useEffect } from 'react';
import { Zap, LayoutDashboard, Feather, Folder, BarChart3, User, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Utility Function to read user data from browser storage (Unchanged) ---
const getLoggedInUserFromStorage = () => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUsername) {
        return {
            username: storedUsername,
            role: storedRole || 'Pro User',
            isLoggedIn: true
        };
    }
    
    return {
        username: 'Guest User',
        role: 'Standard',
        isLoggedIn: false
    };
};

// --- StatCard Component (Unchanged) ---
const StatCard = ({ title, value, icon: Icon, color }) => {
    const iconClasses = {
        indigo: "bg-indigo-500 text-white",
        blue: "bg-blue-500 text-white",
        yellow: "bg-yellow-500 text-white",
    };

    return (
        <div className="p-5 rounded-xl bg-white shadow-xl border border-gray-100">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-extrabold text-gray-900">{value}</p>
                </div>
                <div className={`p-2 rounded-full ${iconClasses[color]} shadow-lg`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <p className="text-xs mt-3 text-gray-400">
                {color === 'yellow' ? "Benchmark set high" : "See detailed report"}
            </p>
        </div>
    );
};


// --- Sidebar Component (UPDATED to accept handleLogout prop) ---
const LightSidebar = ({ onNavigate, userData, handleLogout }) => {
    const username = userData?.username || 'User'; 
    const role = userData?.role || 'Guest';

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, action: () => onNavigate('/dashboard'), current: true },
        { name: "Create Quiz", icon: Feather, action: () => onNavigate('/dashboard/quiz'), current: false },
        { name: "My Quizzes", icon: Folder, action: () => onNavigate('/dashboard/myquizzes'), current: false },
        { name: "Analytics", icon: BarChart3, action: () => onNavigate('/dashboard/analytics'), current: false },
    ];

    return (
        <div className="w-64 flex flex-col h-full bg-white border-r border-gray-200 shadow-lg">
            
            {/* Sidebar Header/Logo */}
            <div className="p-5 flex items-center space-x-2 border-b border-gray-100">
                <Zap className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-bold tracking-tight text-gray-800">QuizCrafter AI</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={item.action}
                        className={`flex items-center p-3 w-full rounded-lg font-medium transition duration-150 
                            ${item.current 
                                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-200' 
                                : 'text-gray-600 hover:bg-gray-50'}
                        `}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="whitespace-nowrap">{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* User/Logout Footer (Now calls handleLogout) */}
            <div className="p-4 border-t border-gray-200">
                <div 
                    onClick={handleLogout} // <--- LOGOUT FUNCTION CALL HERE
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50 transition duration-150 cursor-pointer"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                            {username.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{username}</p> 
                            <p className="text-xs text-gray-500">{role}</p>
                        </div>
                    </div>
                    {/* LogOut icon changes color to red on hover/click area */}
                    <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                </div>
            </div>
        </div>
    );
};

// --- Dashboard Content Component (Unchanged) ---
const LightDashboardContent = ({ navigateToQuiz, username }) => (
    <div className="flex-grow p-8 overflow-y-auto bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {username}!</h1>

        <div className="p-6 mb-8 bg-white rounded-xl shadow-lg border border-yellow-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Ready to create a new quiz?</h2>
            <button 
                onClick={navigateToQuiz}
                className="flex items-center space-x-2 py-3 px-6 rounded-full text-gray-900 font-bold 
                          bg-gradient-to-r from-yellow-500 to-amber-500 shadow-md 
                          hover:from-yellow-400 cursor-pointer hover:to-amber-400 transition duration-300 transform hover:scale-[1.03]"
            >
                <Plus className="w-5 h-5" />
                <span>Create with AI</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Quizzes Created" value="42" icon={Feather} color="indigo" />
            <StatCard title="Total Responses" value="1,850" icon={BarChart3} color="blue" />
            <StatCard title="Avg. Score" value="78%" icon={Zap} color="yellow" />
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Quiz Activity</h3>
            <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
                Quiz list or table component goes here...
            </div>
        </div>
    </div>
);


// --- Main Layout Component (UPDATED with Logout logic) ---
const LightDashboardLayout = () => {
    const navigate = useNavigate();
    
    // Read initial user state from storage
    const [user, setUser] = useState(getLoggedInUserFromStorage); 

    // --- LOGOUT HANDLER ---
    const handleLogout = () => {
        // 1. Clear all user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        
        // 2. Clear user state (optional, but good for immediate UI refresh)
        setUser(null); 
        
        // 3. Redirect to the login/landing page
        navigate('/');
    };
    // ----------------------

    const handleNavigation = (path) => {
        navigate(path);
    };

    const navigateToQuiz = () => {
        handleNavigation("/dashboard/quiz");
    };
    
    const username = user?.username || 'QuizCrafter User';

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            
            {/* Sidebar Component receives the handleLogout function */}
            <LightSidebar 
                onNavigate={handleNavigation} 
                userData={user} 
                handleLogout={handleLogout} // <--- PASSING LOGOUT FUNCTION
            />
            
            <LightDashboardContent navigateToQuiz={navigateToQuiz} username={username} />

        </div>
    );
};

export default LightDashboardLayout;