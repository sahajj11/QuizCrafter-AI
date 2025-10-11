 import React, { useState, useRef, useEffect, useCallback } from 'react';
// IMPORT useNavigate HERE
import { Zap, Send, Plus, CornerDownLeft, Loader2, FileText, CheckCircle, XCircle, Hash, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <--- NEW IMPORT

// --- Configuration ---
// *** IMPORTANT: Ensure this URL matches your running Express backend endpoint ***
const LIVE_QUIZ_API_ENDPOINT = 'http://localhost:5000/api/generate/quiz';
const QUESTION_OPTIONS = [5, 10, 15, 20]; // Options for the dropdown

// --- API Integration: Call the Express Backend (Unchanged) ---
const generateQuizApi = async (prompt, numQuestions) => {
    const topic = prompt; 

    const response = await fetch(LIVE_QUIZ_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            topic: topic,
            numQuestions: numQuestions 
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return {
        success: true,
        quiz: data.quiz,
        quizId: `quiz-${Date.now()}`,
        extractedNum: numQuestions
    };
};
// --- End API Integration ---


// --- Component: Dropdown for Question Count (Unchanged) ---
const QuestionCountSelect = ({ numQuestions, setNumQuestions, isLoading }) => (
    <div className="flex-shrink-0">
        <div className="flex items-center space-x-2 text-sm bg-white p-2 rounded-xl border border-indigo-200 shadow-sm transition duration-150">
            <Hash className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <label htmlFor="numQuestions" className="font-medium text-gray-700 whitespace-nowrap hidden sm:inline">Questions:</label>
            
            <select
                id="numQuestions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="bg-white p-0 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 font-semibold cursor-pointer"
                disabled={isLoading}
            >
                {QUESTION_OPTIONS.map(num => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
        </div>
    </div>
);
// --- End Question Count Select Component ---


// --- Component: Renders the Quiz within the chat bubble (Unchanged) ---
const QuizDisplay = ({ quizData, topic, numRequested }) => {
    if (!quizData || quizData.length === 0) {
        return <p className="text-gray-600 italic">No questions were generated for this topic.</p>;
    }

    const quizTitle = topic.length > 50 ? topic.substring(0, 50) + '...' : topic;

    return (
        <div className="mt-4 p-4 border border-indigo-200 bg-indigo-50 rounded-lg shadow-inner">
            <h4 className="text-lg font-bold text-indigo-800 mb-3">
                {quizData.length} Questions Generated (Requested: {numRequested})
            </h4>
            <p className='text-sm text-gray-700 mb-3 italic'>Topic: "{quizTitle}"</p>
            
            <ul className="space-y-4">
                {quizData.map((q, index) => (
                    <li key={index} className="border-b border-indigo-100 pb-3 last:border-b-0">
                        <p className="font-semibold text-gray-800 mb-2">Q{index + 1}: {q.question}</p>
                        <ul className="space-y-1 text-sm">
                            {q.options && q.options.map((option, optIndex) => (
                                <li key={optIndex} className={`flex items-start p-1 rounded-md ${option === q.correct_answer ? 'bg-green-100 font-medium text-green-700' : 'text-gray-600'}`}>
                                    {option === q.correct_answer ? <CheckCircle className="w-4 h-4 mr-1.5 mt-0.5 text-green-500 flex-shrink-0" /> : <XCircle className="w-4 h-4 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />}
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <a href={`/my-quizzes/edit-draft`} className="mt-4 block text-center py-2 px-4 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150">
                Finalize & Save Quiz
            </a>
        </div>
    );
};
// --- End Quiz Display Component ---


// --- Main Chat Component (Logic updated) ---
const ChatQuizCreator = () => {
    const navigate = useNavigate(); // <--- INITIALIZE NAVIGATE HERE
    
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I'm QuizCrafter AI. How can I help you create an engaging quiz today? \n\nSelect the number of questions below and tell me the topic, e.g., 'React lifecycle methods'.", },
    ]);
    const [input, setInput] = useState('');
    const [numQuestions, setNumQuestions] = useState(QUESTION_OPTIONS[0]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleAIResponse = useCallback(async (userPrompt, num) => {
        setIsLoading(true);

        try {
            const result = await generateQuizApi(userPrompt, num);
            
            const aiResponse = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `Successfully generated a ${result.extractedNum}-question quiz! Review the draft below.`,
                quizData: result.quiz,
                topic: userPrompt,
                numRequested: result.extractedNum
            };

            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            const errorResponse = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `Error: Could not generate quiz. ${error.message}`,
                isError: true
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userPrompt = input.trim();
        const newUserMessage = {
            id: Date.now(),
            sender: 'user',
            text: userPrompt,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput('');
        
        handleAIResponse(userPrompt, numQuestions);
    };

    // --- Message Bubble Component (Unchanged) ---
    const MessageBubble = ({ message }) => (
        <div className={`flex w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div 
            className={`max-w-3xl p-4 rounded-xl shadow-md whitespace-pre-wrap ${
              message.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : message.isError 
                    ? 'bg-red-50 text-red-800 rounded-tl-none border border-red-300'
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}
          >
            <span className="font-semibold text-sm mr-2 opacity-70 block mb-1">
              {message.sender === 'ai' ? 'QuizCrafter AI' : 'You'}
            </span>
            <div className="text-base pt-1">
                {message.text.split('\n').map((line, index) => (
                    <p key={index} className={index > 0 ? 'mt-2' : ''}>
                        {line}
                    </p>
                ))}
            </div>
            
            {message.quizData && (
                <QuizDisplay quizData={message.quizData} topic={message.topic} numRequested={message.numRequested} />
            )}
            
            {message.quizLink && !message.quizData && (
                <a href={message.quizLink} className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-150 border-b border-indigo-600">
                    <FileText className="w-4 h-4 mr-1" />
                    View Generated Quiz
                </a>
            )}
          </div>
        </div>
      );
      // --- End Message Bubble Component ---

    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans">
          
          {/* Top Header (MODIFIED) */}
          <header className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between">
            
            {/* Left Side: Back Button & Logo */}
            <div className="flex items-center space-x-3">
                <button 
                    onClick={() => navigate('/dashboard')} // <--- BACK BUTTON ACTION
                    className="p-2 rounded-full text-indigo-600 hover:bg-gray-100 transition duration-150"
                    title="Go back to Dashboard"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-xl font-bold text-gray-800 hidden sm:inline">New Quiz Creator</h1>
                </div>
            </div>
            
            {/* Right Side: New Chat Button */}
            <button className="flex items-center space-x-2 py-2 px-4 rounded-full text-gray-900 font-bold text-sm 
                       bg-gradient-to-r from-yellow-500 to-amber-500 shadow-md hover:from-yellow-400 transition duration-300">
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </header>

          {/* Main Chat Area (Unchanged) */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="max-w-xs p-4 rounded-xl bg-white text-gray-600 border border-gray-100 flex items-center space-x-2 shadow-md">
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                    <span>QuizCrafter AI is crafting...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar (Unchanged) */}
          <div className="p-4 bg-white border-t border-gray-200 shadow-2xl">
            <form onSubmit={handleSend} className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                
                {/* 1. Question Count Dropdown (Visible UI) */}
                <QuestionCountSelect 
                    numQuestions={numQuestions} 
                    setNumQuestions={setNumQuestions} 
                    isLoading={isLoading}
                />
                
                {/* 2. Text Input Area */}
                <div className="relative flex-grow w-full sm:w-auto">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleSend(e);
                      }
                    }}
                    rows={1}
                    placeholder={isLoading ? "Generating quiz, please wait..." : "Ask QuizCrafter AI to create your quiz..."}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-xl shadow-inner focus:ring-indigo-500 focus:border-indigo-500 resize-none overflow-hidden transition duration-150 bg-gray-50 text-gray-800 placeholder-gray-500 disabled:bg-gray-200"
                    style={{ maxHeight: '200px' }} 
                    disabled={isLoading}
                  />
                  <CornerDownLeft className="absolute right-3 bottom-3 w-4 h-4 text-gray-400" title="Shift+Enter for newline" />
                </div>

                {/* 3. Send Button */}
                <button
                  type="submit"
                  className="p-3 rounded-full text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-lg disabled:opacity-50"
                  disabled={input.trim() === '' || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
            </form>
            <p className="text-xs text-gray-400 mt-1 text-center">
              QuizCrafter AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      );
    };

export default ChatQuizCreator;