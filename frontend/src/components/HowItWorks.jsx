import React from 'react';
import { MessageSquare, Zap, Send } from 'lucide-react'; // Example icons

const steps = [
  { 
    number: 1, 
    icon: MessageSquare, 
    title: "Tell us your topic.", 
    description: "Input your text, keywords, or learning objectives." 
  },
  { 
    number: 2, 
    icon: Zap, 
    title: "AI generates your quiz.", 
    description: "Our AI engine crafts a complete, balanced quiz instantly." 
  },
  { 
    number: 3, 
    icon: Send, 
    title: "Review, customize, and share!", 
    description: "Tweak the questions, preview, and share a link or export the file." 
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-16">
          Crafting Quizzes in 3 Easy Steps
        </h2>
        
        <div className="relative flex flex-col lg:flex-row justify-between items-start space-y-12 lg:space-y-0 lg:space-x-12">
          
          {/* Connector Line (visible on larger screens) */}
          <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 w-[80%] h-0.5 bg-indigo-200"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full lg:w-1/3 text-center relative z-10">
              {/* Step Icon/Number */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {step.number}
                </div>
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-2 rounded-full shadow-lg">
                    <step.icon className="w-4 h-4 text-indigo-900" />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;