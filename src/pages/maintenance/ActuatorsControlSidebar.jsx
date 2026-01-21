import React from 'react';

const ControlGroup = ({ title, current }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xs font-bold text-base-content/70">{title}</h3>
      <button className="btn btn-xs btn-ghost text-[10px] border border-base-300">Recorrido Automático</button>
    </div>
    
    <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm space-y-4">
      <div>
        <label className="text-[10px] uppercase text-base-500 block mb-1">Setpoint</label>
        <input type="range" className="range range-primary range-xs" />
        <div className="flex justify-between text-[10px] font-mono mt-1">
          <span>0.0 cm</span>
          <span className="text-primary font-bold">0.0 cm</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-[10px] bg-base-200/50 p-2 rounded-lg border border-base-300">
        <span className="text-base-500 uppercase">Valor Real (Encoder)</span>
        <span className="font-mono font-bold text-primary">{current} cm</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex items-center gap-2 p-2 bg-success/10 border border-success/20 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <span className="text-[9px] font-bold text-success uppercase">Carrera Mínima</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-base-200 border border-base-300 rounded-lg opacity-50">
          <div className="w-2 h-2 rounded-full bg-base-content/30"></div>
          <span className="text-[9px] font-bold text-base-content/50 uppercase">Carrera Máxima</span>
        </div>
      </div>
    </div>
  </div>
);

export const ActuatorsSidebar = () => (
  <aside className="w-80 flex-none border-l border-base-300 bg-base-200/50 overflow-y-auto p-4 flex flex-col shadow-inner">
    <div className="flex items-center gap-2 mb-6 border-b border-base-300 pb-2">
      <div className="w-1.5 h-4 bg-primary rounded-full"></div>
      <h2 className="text-[11px] font-black uppercase tracking-widest">Actuators Control</h2>
    </div>
    <ControlGroup title="VBD" current="0.0" />
    <ControlGroup title="Pitch" current="0.0" />
    <ControlGroup title="Roll" current="0.0" />
  </aside>
);