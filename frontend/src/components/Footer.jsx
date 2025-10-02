import React from 'react';
import { Twitter, Linkedin, Github, Dribbble, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navGroups = [
    { 
      title: "Product", 
      links: ["Features", "Pricing", "How It Works", "Integrations"] 
    },
    { 
      title: "Company", 
      links: ["About Us", "Careers", "Blog", "Contact"] 
    },
    { 
      title: "Support", 
      links: ["FAQ", "Help Center", "Terms of Service", "Privacy Policy"] 
    },
  ];

  const socialIcons = [
    { Icon: Twitter, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Github, href: "#" },
    { Icon: Dribbble, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
          
          {/* Company Info / Logo */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center text-2xl font-bold text-indigo-400">
              <Zap className="w-6 h-6 mr-2" />
              QuizCrafter AI
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              The smartest AI platform for instantly creating, customizing, and analyzing engaging quizzes.
            </p>
          </div>
          
          {/* Navigation Links */}
          {navGroups.map((group, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-indigo-400 transition duration-150 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar: Copyright & Social */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8">
          <p className="text-sm text-gray-500 order-2 sm:order-1 mt-6 sm:mt-0">
            &copy; {currentYear} QuizCrafter AI. All rights reserved.
          </p>
          
          <div className="flex space-x-4 order-1 sm:order-2">
            {socialIcons.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-400 transition duration-150"
              >
                <item.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;