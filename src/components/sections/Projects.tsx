import React from 'react';
import { Briefcase, Database, Code, Github, ExternalLink, Loader } from 'lucide-react';
import { ProjectType } from '../../types';

interface ProjectsProps {
  projects: ProjectType[];
  isLoading: boolean;
  isVisible: { [key: number]: boolean };
}

const Projects: React.FC<ProjectsProps> = ({ projects, isLoading, isVisible }) => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-600 dark:to-pink-500 mr-4" />
          <Briefcase className="mr-3 text-pink-700 dark:text-pink-400" size={32} />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-700 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-600 dark:to-pink-500 ml-4" />
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-700 dark:text-gray-400 flex items-center justify-center">
            <Database size={16} className="mr-2 text-green-600 dark:text-green-400" />
            Projects loaded from Firebase Database ({projects.length} items)
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 dark:border-purple-500 mb-4"></div>
            <p className="text-gray-700 dark:text-gray-400 text-lg flex items-center">
              <Loader className="mr-2" size={20} />
              Loading projects from database...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-700 dark:text-gray-400 text-lg">
              No projects found in the database.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`animate-on-scroll group bg-white/80 dark:bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-purple-200 dark:border-purple-500/20 overflow-hidden hover:border-purple-300 dark:hover:border-purple-500/60 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 duration-300 shadow-lg ${
                  isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transition: 'all 0.6s ease-out', transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
                      {project.title}
                    </h3>
                    <Code className="text-pink-600 dark:text-pink-400" size={20} />
                  </div>
                  <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-slate-700/50 text-gray-800 dark:text-gray-300 rounded text-xs border border-purple-200 dark:border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300 group"
                    >
                      <Github size={18} className="mr-1" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 group"
                    >
                      <ExternalLink size={18} className="mr-1" />
                      <span className="text-sm">Live</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;