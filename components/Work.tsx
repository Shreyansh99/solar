import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Neon Horizon',
    category: 'Web Development',
    year: '2023',
    imageUrl: 'https://picsum.photos/seed/neon/800/600'
  },
  {
    id: '02',
    title: 'Cyber Finance',
    category: 'App Design',
    year: '2024',
    imageUrl: 'https://picsum.photos/seed/cyber/800/600'
  },
  {
    id: '03',
    title: 'Arkitekt',
    category: 'Branding',
    year: '2023',
    imageUrl: 'https://picsum.photos/seed/arch/800/600'
  }
];

export const Work: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] bg-white/20 flex-grow"></div>
          <h2 className="text-white font-display text-3xl font-bold uppercase tracking-widest">Selected Work</h2>
          <div className="h-[1px] bg-white/20 flex-grow"></div>
        </div>

        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center group cursor-pointer`}
            >
              {/* Image Container */}
              <div className="w-full md:w-3/5 overflow-hidden relative rounded-sm">
                <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                   <span className="text-red-500 font-mono text-sm">{project.id}</span>
                   <div className="h-[1px] w-10 bg-red-500"></div>
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                  <span className="text-neutral-400 text-sm uppercase tracking-wider">{project.category}</span>
                  <span className="text-neutral-500 font-mono text-sm">{project.year}</span>
                </div>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   <button className="flex items-center gap-2 text-white hover:text-red-500 transition-colors uppercase text-sm font-bold tracking-widest">
                     View Case Study <ArrowUpRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
            <button className="text-neutral-500 hover:text-white transition-colors border-b border-neutral-800 hover:border-white pb-1 text-sm uppercase tracking-widest">View All Projects</button>
        </div>
      </div>
    </section>
  );
};