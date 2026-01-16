import React from 'react';
import { User, Coffee } from 'lucide-react';
import { SkillType } from '../../types';

const skills: SkillType[] = [
  { category: 'Frontend', items: ['React.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'TypeScript'], icon: '🎨' },
  { category: 'Backend', items: ['Node.js', 'Firebase Authentication'], icon: '⚙️' },
  { category: 'Database', items: ['Firebase Firestore', 'Firebase Hosting'], icon: '💾' },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'npm'], icon: '🛠️' }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-600 dark:to-purple-500 mr-4" />
          <User className="mr-3 text-purple-700 dark:text-purple-400" size={32} />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-600 dark:to-purple-500 ml-4" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/80 dark:bg-slate-800/30 backdrop-blur-lg p-8 rounded-2xl border border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300 shadow-lg">
            <div className="flex items-center mb-6">
              <Coffee className="text-purple-700 dark:text-purple-400 mr-3" size={28} />
              <h3 className="text-3xl font-semibold text-purple-800 dark:text-purple-300">My Journey</h3>
            </div>
            <p className="text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              I spent six years studying IT, starting from scratch and gradually building a solid foundation. Along the way, I explored projects beyond coursework, experimented with different technologies, and challenged myself to learn continuously.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              I'm currently gaining practical experience through my internship, tackling real-world problems, learning how to work with code in production, and discovering the day-to-day realities of software development.
            </p>
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
              I approach coding as a craft: every line matters, and every project is an opportunity to create something meaningful. I'm excited to keep growing, exploring, and shaping my path as a developer while building digital experiences that matter.
            </p>
          </div>

          <div className="space-y-4">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-slate-800/30 backdrop-blur-lg p-6 rounded-xl border border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 duration-300 shadow-lg"
              >
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center text-lg">
                  <span className="text-2xl mr-3">{skillGroup.icon}</span>
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-200 rounded-full text-sm border border-purple-300 dark:border-purple-500/30 hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;