import { Link, Outlet, useLocation } from 'react-router-dom';
import { Gauge, Cpu, Radio, ScrollText } from 'lucide-react';
import { ActuatorsSidebar } from '../components/ActuatorsSidebar'; // Ajusta la ruta

const iconMap = {
  'internal': Cpu,
  'external': Radio,
  'actuators': Gauge,
  'logs': ScrollText
};

export function SubLayout({ mainPath, subRoutes = [] }) {
  const location = useLocation();
  const isMaintenance = mainPath === 'config';

  return (
    /* h-full para que ocupe el espacio que le da el main de App.js */
    <div className="flex flex-row h-full w-full gap-6 p-4">
      
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
                      ? 'bg-base-200 text-primary border border-base-300 shadow-sm shadow-glow' 
                      : 'text-base-500 hover:bg-base-200/50 hover:text-base-800'
                  }`}
                >
                  <Icon size={18} />
                  {route.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4 bg-base-200/50 rounded-2xl border border-base-300">
            <p className="text-[10px] font-bold text-base-500 uppercase">Hardware ID</p>
            <p className="text-xs font-mono text-base-content/70">GLD-09-X22</p>
          </div>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO CENTRAL */}
      <section className="w-full/2 flex-none overflow-y-auto">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Outlet />
        </div>
      </section>

      {/* SIDEBAR DERECHO (Condicional) */}
      {isMaintenance && <ActuatorsSidebar />}
      
    </div>
  );
}