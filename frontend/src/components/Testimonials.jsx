import React from 'react';
import { Star } from 'lucide-react'; // Icon for the star rating

const testimonialsData = [
  {
    quote: "As a teacher, QuizCrafter AI has saved me countless hours! I can generate a pre-test in minutes and the AI ensures the questions cover the whole curriculum.",
    name: "Sarah J.",
    title: "High School Educator",
    avatar: "/avatars/sarah.jpg", // Placeholder - replace with actual path
  },
  {
    quote: "The analytics feature is brilliant. I can instantly pinpoint which topics my team is struggling with and adjust my training modules on the fly.",
    name: "Mark T.",
    title: "Corporate Trainer, TechCo",
    avatar: "/avatars/mark.jpg", // Placeholder
  },
  {
    quote: "Building engaging trivia for our community used to be a chore. Now, I just feed the AI my content and get perfectly structured, fun quizzes back. Highly recommended!",
    name: "Alex B.",
    title: "Content Creator",
    avatar: "/avatars/alex.jpg", // Placeholder
  },
];

const StarRating = ({ count = 5 }) => (
  <div className="flex items-center space-x-0.5 text-yellow-400 mb-4">
    {Array(count).fill(0).map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          What Our Users Say
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Hear from educators, trainers, and creators who are crafting smarter quizzes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <StarRating />
                <blockquote className="text-lg italic text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              
              <div className="flex items-center pt-4 border-t border-gray-100">
                {/* <img 
                  className="w-12 h-12 rounded-full object-cover mr-4 bg-indigo-200" 
                  src={testimonial.avatar} 
                  alt={`Avatar of ${testimonial.name}`} 
                /> */}
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-indigo-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;