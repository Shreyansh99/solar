import React from 'react';
import { Code, Monitor, Smartphone, Globe, Box, Zap } from 'lucide-react';
import { Service } from '../types';

const SERVICES: Service[] = [
  {
    id: '01',
    title: 'Web Development',
    description: 'High-performance websites built with React, Next.js, and modern frameworks.',
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: '02',
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that scale.',
    icon: <Smartphone className="w-8 h-8" />
  },
  {
    id: '03',
    title: 'UI/UX Design',
    description: 'User-centric design systems that drive engagement and conversion.',
    icon: <Monitor className="w-8 h-8" />
  },
  {
    id: '04',
    title: 'Brand Identity',
    description: 'Comprehensive branding packages to make your business stand out.',
    icon: <Box className="w-8 h-8" />
  },
  {
    id: '05',
    title: 'Digital Strategy',
    description: 'Data-driven insights to guide your digital transformation journey.',
    icon: <Zap className="w-8 h-8" />
  },
  {
    id: '06',
    title: 'Custom Software',
    description: 'Tailored software solutions for complex business problems.',
    icon: <Code className="w-8 h-8" />
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-neutral-950 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-red-500 font-mono text-sm tracking-widest mb-4">/ OUR EXPERTISE</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold">Comprehensive <br />Digital Solutions</h3>
          </div>
          <p className="max-w-md text-neutral-400 mt-6 md:mt-0">
            We combine design, technology, and strategy to build products that not only look good but perform exceptionally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-red-500/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-4xl font-bold text-white group-hover:text-red-500 transition-colors">
                {service.id}
              </div>
              
              <div className="w-12 h-12 rounded bg-neutral-900 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h4 className="text-xl font-bold mb-3 font-display">{service.title}</h4>
              <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                {service.description}
              </p>
              
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};