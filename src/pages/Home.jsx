import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      {/* HERO SECTION */}
      <div className="text-center py-10 bg-base-200 rounded-3xl border border-base-300 shadow-sm">
        <img 
          src="/cidesi.jpg" 
          alt="Mission Control Logo" 
          className="mx-auto h-12 w-auto mb-6 drop-shadow-sm rounded-lg"
        />
        <h1 className="text-5xl font-black  text-base-content tracking-tighter mb-2">
          Glider Control
        </h1>
        <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-lg">
          Interfaz de monitoreo y control del planeador submarino • System Version 1.0.0
        </p>
      </div>
 

      {/* QUICK START CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card UART */}
        <div className="card bg-base-200 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-base-700">Conexión Serial</h2>
              <div className="badge badge-outline text-[10px] font-bold">UART</div>
            </div>
            <p className="text-sm text-base-500">Configure COM ports and 115200 baud rate transmission.</p>
            <div className="card-actions justify-end mt-4">
              <button 
                onClick={() => navigate('/config/general')}
                className="btn btn-primary btn-sm normal-case shadow-lg shadow-blue-200"
              >
                Setup Port
              </button>
            </div>
          </div>
        </div>

        {/* Card WiFi */}
        <div className="card bg-base-200 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-base-700">Wireless Link</h2>
              <div className="badge badge-outline text-[10px] font-bold">WIFI</div>
            </div>
            <p className="text-sm text-base-500">Connect via TCP/UDP for long-range data monitoring.</p>
            <div className="card-actions justify-end mt-4">
              <button 
                onClick={() => navigate('/monitor/general')}
                className="btn btn-outline btn-sm normal-case"
              >
                Go to Mission
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM CHECKLIST */}
      <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-xs">
        <h3 className="text-blue-400 mb-4 font-bold uppercase tracking-widest text-[10px]"> System Pre-flight Checklist
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-green-500">[✓]</span> Backend Rust Engine: Operational
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">[✓]</span> Frontend React UI: Rendered
          </li>
          <li className="flex items-center gap-2 text-yellow-500">
            <span className="animate-pulse">[!]</span> Serial Hardware: Not Detected
          </li>
          <li className="flex items-center gap-2 text-slate-500">
            <span>[ ]</span> WiFi Stream: Offline
          </li>
        </ul>
      </div>
    </div>
  );
}