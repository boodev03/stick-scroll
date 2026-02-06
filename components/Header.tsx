
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-10 py-8 mix-blend-difference pointer-events-none">
      <div className="text-xl font-black tracking-tighter uppercase pointer-events-auto cursor-pointer group">
        Lumina<span className="text-indigo-500 group-hover:px-1 transition-all">.</span>
      </div>
      
      <nav className="hidden lg:flex items-center space-x-12 pointer-events-auto">
        {['Gallery', 'Archive', 'Lab', 'Contact'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-8 pointer-events-auto">
        <button className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white">EN</button>
        <div className="w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer group">
            <span className="w-full h-px bg-white group-hover:w-1/2 transition-all"></span>
            <span className="w-full h-px bg-white"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
