import React from 'react';
import { Sparkles, ArrowRight, Code, Server, Database, Github, Linkedin, Mail } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-20 relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 dark:bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-300 dark:border-purple-500/30 animate-bounce">
            <span className="flex items-center text-purple-800 dark:text-purple-300 font-medium">
              <Sparkles size={16} className="mr-2" />
              Available for opportunities
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-pulse">
              Hi, I'm Asmah Yaseen
            </span>
          </h1>
          
          <div className="text-2xl md:text-3xl text-gray-800 dark:text-gray-300 mb-4 font-medium">
            <span className="inline-block">Graduate Software Developer</span>
            <span className="mx-3 text-purple-600 dark:text-purple-400">•</span>
            <span className="inline-block">Full-Stack Focus</span>
            <span className="mx-3 text-purple-600 dark:text-purple-400">•</span>
            <span className="inline-block">Problem-Solving Mindset</span>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Crafting elegant digital experiences with modern web technologies.
            Applying problem-solving and engineering principles to build dependable systems.
          </p>

          <div className="flex justify-center space-x-4 mb-10">
            <button
              onClick={() => scrollToSection('projects')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 transition-all transform hover:scale-105 flex items-center"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-600 dark:border-purple-500 text-purple-700 dark:text-purple-300 px-8 py-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all backdrop-blur-sm"
            >
              Let's Talk
            </button>
          </div>
          
          <div className="flex justify-center space-x-6">
            {[
              {
                Icon: Github,
                href: 'https://github.com/AsmahY13',
                label: 'GitHub'
              },
              {
                Icon: Linkedin,
                href: 'https://www.linkedin.com/in/asmah-yaseen-a552a5263',
                label: 'LinkedIn'
              },
              {
                Icon: Mail,
                href: 'mailto:asmahy13@gmail.com',
                label: 'Email'
              }
            ].map(({ Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-lg text-gray-700 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-12 flex justify-center items-center space-x-3 text-sm">
            <span className="text-gray-700 dark:text-gray-300">Built with:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded-full border border-blue-300 dark:border-blue-500/30 flex items-center">
              <Code size={14} className="mr-1" />
              React
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300 rounded-full border border-green-300 dark:border-green-500/30 flex items-center">
              <Server size={14} className="mr-1" />
              Node.js
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 rounded-full border border-yellow-300 dark:border-yellow-500/30 flex items-center">
              <Database size={14} className="mr-1" />
              Firebase
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;