import React from 'react';
import { Lightbulb, Settings, BarChart2, Share2 } from 'lucide-react'; 

const featureData = [
  { 
    icon: Lightbulb, 
    title: "AI-Powered Generation", 
    description: "Instantly create diverse question types (MCQ, true/false, open-ended) on any topic." 
  },
  { 
    icon: Settings, 
    title: "Customizable & Flexible", 
    description: "Tailor quizzes to your audience with adjustable difficulty, length, and formats." 
  },
  { 
    icon: BarChart2, 
    title: "Analytics & Insights", 
    description: "Track performance, identify knowledge gaps, and optimize learning outcomes." 
  },
  { 
    icon: Share2, 
    title: "Seamless Integration", 
    description: "Export quizzes to popular LMS platforms or share directly with a link." 
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Why Choose QuizCrafter AI?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featureData.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border-t-4 border-indigo-500 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl bg-gray-50"
            >
              <feature.icon className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;