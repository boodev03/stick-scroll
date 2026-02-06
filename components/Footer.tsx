
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-24 px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-6xl font-black font-serif italic mb-8 tracking-tighter leading-none">
              Let's create the <br /> <span className="text-indigo-500">Unseen</span> together.
            </h2>
            <div className="flex gap-6 items-center">
              <a href="mailto:hello@lumina.studio" className="text-sm font-bold border-b border-indigo-500 pb-1 hover:text-indigo-500 transition-colors">hello@lumina.studio</a>
              <span className="w-8 h-px bg-white/20"></span>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">New York / Tokyo</p>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-9">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 mb-8">Navigation</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
              <li className="hover:text-white transition-colors cursor-pointer">Projects</li>
              <li className="hover:text-white transition-colors cursor-pointer">Exhibitions</li>
              <li className="hover:text-white transition-colors cursor-pointer">Manifesto</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 mb-8">Social</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
              <li className="hover:text-white transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-white transition-colors cursor-pointer">Behance</li>
              <li className="hover:text-white transition-colors cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center py-12 border-t border-white/5 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.5em]">
          <p>© 2024 LUMINA COLLECTIVE — ARCHITECTING THE FUTURE</p>
          <p className="mt-4 md:mt-0">MADE WITH PASSION & PIXELS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
