import { Link, Outlet, useLocation } from 'react-router-dom';
import { Gauge, Cpu, Radio, ScrollText } from 'lucide-react';

const iconMap = {
  'internal': Cpu,
  'external': Radio,
  'actuators': Gauge,
  'logs': ScrollText
};

export function SubLayout({ mainPath, subRoutes }) {
  const location = useLocation();

  return (
    <div className="flex flex-row h-[calc(100vh-80px)] gap-6">
      {/* SIDEBAR IZQUIERDO */}
      <aside className="w-64 flex-none">
        <div className="bg-base-100 border border-base-300 rounded-3xl h-full p-4 shadow-sm flex flex-col gap-2">
          <div className="px-4 py-2 mb-2">
            <h3 className="text-[10px] font-bold text-base-500 uppercase tracking-[0.2em]">
              Navegacion
            </h3>
          </div>
          
          <nav className="flex-1 flex flex-col gap-1">
            {subRoutes.map((route) => {
              const isActive = location.pathname.includes(route.path);
              const Icon = iconMap[route.path] || Cpu;
              return (
                <Link
                  key={route.path}
                  to={`/${mainPath}/${route.path}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                    isActive 
                      ? 'bg-base-100 text-base-800 border border-base-600 shadow-sm' 
                      : 'text-base-500 hover:bg-base-100 hover:text-base-800'
                  }`}
                >
                  <Icon size={18} />
                  {/* Indicador visual lateral si está activo */}
                  {isActive && <div className="w-1 h-4 bg-base-600 rounded-full" />}
                  {route.name}
                </Link>
              );
            })}
          </nav>

          {/* Espacio inferior del sidebar para info rápida */}
          <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Hardware ID</p>
            <p className="text-xs font-mono text-slate-600">GLD-09-X22</p>
          </div>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO (DERECHA) */}
      <section className="flex-1 overflow-y-auto pr-2">
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <Outlet />
        </div>
      </section>
    </div>
  );
}