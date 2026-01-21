import React, { useEffect, useRef, useState } from 'react';

export function TerminalFooter() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'system', msg: 'INITIALIZING SERIAL PROTOCOL...' },
    { id: 2, type: 'rx', msg: '$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47' },
  ]);
  const scrollRef = useRef(null);

  // Auto-scroll al recibir nuevos datos
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <footer className="h-42 bg-base-300/50 border-t border-base-300 flex flex-col overflow-hidden">
      {/* Barra de estado del Terminal */}
      <div className="flex justify-between items-center px-4 py-1 bg-base-300 border-b border-base-300">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-base-content/50 tracking-widest uppercase">
            Raw Telemetry Stream
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-mono text-primary italic">Listening...</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-base-content/40">
          BAUD: 115200 | PARITY: NONE
        </div>
      </div>

      {/* Área de Datos Crudos */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 font-mono text-[11px] leading-tight shadow-inner bg-black/10 selection:bg-primary/30"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 border-b border-base-content/5 py-0.5">
            <span className="text-base-content/80 shrink-0">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.type === 'rx' ? 'text-content' : 'text-primary'}>
              {log.type === 'rx' ? '>> ' : ':: '}
              {log.msg}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
}