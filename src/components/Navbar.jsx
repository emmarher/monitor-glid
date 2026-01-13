import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  // Función para determinar si la ruta es la activa
  // Para el home, verificamos si es exactamente '/'
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.includes(path);
  };

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-6 fixed top-0 z-50 h-16">
      
      {/* SECCIÓN IZQUIERDA: Logo */}
      <div className="flex-1 flex flex-col items-start leading-tight">
        <span className="text-lg font-black tracking-tighter text-slate-800">
          GLIDER CONTROL
        </span>
        <span className="text-[10px] font-bold text-blue-500 tracking-widest uppercase">
          Interfaz de Monitoreo y Control
        </span>
      </div>

      {/* SECCIÓN CENTRAL: Control Segmentado con HOME incluido */}
      <div className="flex-none bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner flex items-center">
        <Link 
          to="/" 
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            isActive('/') ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Inicio
        </Link>
        <Link 
          to="/config" 
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            isActive('/config') ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Mantenimiento
        </Link>
        <Link 
          to="/analisis" 
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            isActive('/analisis') ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Simulacion
        </Link>
        <Link 
          to="/monitor" 
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            isActive('/monitor') ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Mision
        </Link>
      </div>

      {/* SECCIÓN DERECHA: Status y Perfil */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 border border-green-200 bg-green-50 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">
            Estado: Conectado
          </span>
        </div>
        
        <div className="avatar">
          <div className="w-8 h-8 rounded-full ring ring-slate-200 ring-offset-base-100 ring-offset-1">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="user" />
          </div>
        </div>
      </div>
    </nav>
  );
}