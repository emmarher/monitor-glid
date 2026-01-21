import { useNavigate } from 'react-router-dom';
import { Cpu, Activity, Wifi, Terminal, Battery, Thermometer, Gauge, Anchor } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-700 max-w-[1400px] mx-auto w-full p-4">
      
      {/* HEADER COMPACTO CON LOGOS */}
      <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
        <div className="flex items-center gap-6">
          <img src="/cidesi.jpg" alt="CIDESI" className="h-10 w-auto rounded" />
          <img src="/unindetec.png" alt="UNINDETEC" className="h-12 w-auto brightness-110" style={{ borderRadius: '8px' }} />
          <div className="h-8 w-[1px] bg-base-300 mx-2 hidden md:block"></div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">Glider Pilot</h1>
            <p className="text-[9px] font-bold text-base-500 uppercase tracking-widest mt-1">Ground Control Station</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-error/10 border border-error/20 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-error"></div>
            <span className="text-[10px] font-black text-error uppercase">Sistema Desconectado</span>
          </div>
          <span className="text-[10px] font-mono text-base-500">v1.0.0</span>
        </div>
      </header>

      {/* CUADRÍCULA DE PANELES (Aspecto imagen 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* COLUMNA IZQUIERDA: ESTADO RÁPIDO */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Panel de Telemetría Resumida */}
          <div className="bg-base-100 rounded-2xl border border-base-300 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-base-200 pb-2">
              <Activity size={14} className="text-primary" />
              <h2 className="text-[11px] font-black uppercase tracking-wider">Estado del Sistema</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Batería', val: '-- %', icon: Battery },
                { label: 'Temp. Interna', val: '-- °C', icon: Thermometer },
                { label: 'Presión', val: '-- mbar', icon: Gauge },
                { label: 'Profundidad', val: '-- m', icon: Anchor },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-2">
                    <item.icon size={12} className="text-base-400" />
                    <span className="text-xs text-base-500 font-medium">{item.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-base-400 group-hover:text-primary transition-colors">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Conexión (Estilo imagen 3 inferior) */}
          <div className="bg-base-100 rounded-2xl border border-base-300 p-5 shadow-sm">
            <h2 className="text-sm font-bold mb-1">Conexión del Planeador</h2>
            <p className="text-[10px] text-base-500 mb-4 font-medium uppercase tracking-tight">Seleccione método de enlace</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button className="btn btn-xs h-8 bg-base-200 border-base-300 font-bold gap-2 normal-case">
                <Wifi size={12} /> Wi-Fi
              </button>
              <button className="btn btn-xs h-8 bg-base-200 border-base-300 font-bold gap-2 normal-case">
                <Cpu size={12} /> UART
              </button>
            </div>

            <button 
              onClick={() => navigate('/config/internal')}
              className="btn btn-primary btn-sm w-full font-bold shadow-md shadow-primary/20"
            >
              Conectar al Sistema
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: TERMINAL / FEED PRINCIPAL */}
        <div className="lg:col-span-8">
          <div className="bg-base-100 rounded-2xl border border-base-300 h-full flex flex-col shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-base-200 bg-base-200/20">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-primary" />
                <h2 className="text-[11px] font-black uppercase tracking-wider">Terminal de Comandos</h2>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-error/30"></div>
                <div className="w-2 h-2 rounded-full bg-warning/30"></div>
                <div className="w-2 h-2 rounded-full bg-success/30"></div>
              </div>
            </div>
            
            {/* Estado Desconectado (Imagen 3) */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4 border border-base-300">
                <Wifi size={24} className="text-base-300" />
              </div>
              <h3 className="text-lg font-black opacity-40">Desconectado</h3>
              <p className="text-xs text-base-400 max-w-[240px] mt-1 font-medium">
                Establezca una conexión para visualizar el terminal en serie y recibir telemetría.
              </p>
            </div>

            <div className="p-4 bg-base-200/50 border-t border-base-200">
              <div className="flex gap-2">
                <input 
                  disabled 
                  type="text" 
                  placeholder="Esperando conexión..." 
                  className="flex-1 bg-base-100 border border-base-300 rounded-lg px-3 py-1.5 text-xs font-mono outline-none" 
                />
                <button className="btn btn-square btn-sm bg-primary border-none text-white shadow-sm opacity-50 cursor-not-allowed">
                  <Wifi size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}