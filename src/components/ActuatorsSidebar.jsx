import React from 'react';

const ControlGroup = ({ title, current }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex justify-between items-center mb-2 px-1">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-base-500">{title}</h3>
      <button className="text-[9px] font-bold px-2 py-1 rounded bg-base-300/50 border border-base-300 hover:bg-base-300 transition-colors">
        AUTO
      </button>
    </div>
    
    <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm space-y-4">
      <div>
        <div className="flex justify-between text-[10px] font-mono mb-1.5">
          <span className="text-base-500">SETPOINT</span>
          <span className="text-primary font-bold">0.0 cm</span>
        </div>
        <input type="range" className="range range-primary range-xs" />
      </div>
      
      <div className="flex justify-between items-center p-2 bg-base-200/50 rounded-xl border border-base-300 shadow-inner">
        <span className="text-[9px] font-bold text-base-500 uppercase tracking-tighter">Real Time Encoder</span>
        <span className="font-mono text-xs font-black text-primary">{current} cm</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex items-center justify-center gap-1.5 py-1.5 bg-success/10 border border-success/20 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_5px_#22c55e]"></div>
          <span className="text-[8px] font-black text-success uppercase">Min</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-1.5 bg-base-300/30 border border-base-300 rounded-lg opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-base-content/30"></div>
          <span className="text-[8px] font-black text-base-content/50 uppercase">Max</span>
        </div>
      </div>
    </div>
  </div>
);

export const ActuatorsSidebar = () => (
  <aside className="w-92 flex-none animate-in slide-in-from-right-4 duration-500">
    <div className="bg-base-100 border border-base-300 rounded-3xl h-full p-4 shadow-sm shadow-glow flex flex-col">
      <div className="px-2 py-2 mb-4 border-b border-base-300/50">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
          Actuators Control
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        <ControlGroup title="VBD System" current="0.0" />
        <ControlGroup title="Pitch Mass" current="0.0" />
        <ControlGroup title="Roll Internal" current="0.0" />
      </div>
    </div>
  </aside>
);