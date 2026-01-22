import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Activity, Wifi, Terminal, Battery, Thermometer, Gauge, Anchor, Send, RefreshCw } from 'lucide-react';
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export function Home() {
  const navigate = useNavigate();

  // --- ESTADOS DE CONEXIÓN Y MENSAJES ---
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [command, setCommand] = useState("");
  const [availablePorts, setAvailablePorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll para la terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // --- ESCANEO DE PUERTOS COM (UART) ---
  const scanPorts = async () => {
    try {
      const ports = await invoke("get_available_ports");
      setAvailablePorts(ports);
      if (ports.length > 0 && !selectedPort) {
        setSelectedPort(ports[0]);
      }
    } catch (err) {
      console.error("Error al escanear puertos:", err);
    }
  };

  // --- LÓGICA DE EVENTOS TAURI (RUST -> JS) ---
  useEffect(() => {
    let unlistenRaw;
    let unlistenStatus;

    const setupListeners = async () => {
      unlistenRaw = await listen("raw-data", (event) => {
        addMessage("RX", event.payload);
      });

      unlistenStatus = await listen("connection-status", (event) => {
        const status = event.payload;
        setIsConnected(status === "CONNECTED");
        addMessage("SYSTEM", `Estado de Red: ${status}`);
      });
    };

    setupListeners();
    scanPorts();
    
    // Intervalo para actualizar la lista de puertos automáticamente
    const portInterval = setInterval(scanPorts, 5000);

    return () => {
      if (unlistenRaw) unlistenRaw();
      if (unlistenStatus) unlistenStatus();
      clearInterval(portInterval);
    };
  }, []);

  // --- FUNCIONES DE ACCIÓN ---
  const addMessage = (type, text) => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setMessages(prev => [...prev, { time, type, text }]);
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (command.trim() && isConnected) {
      try {
        await invoke("send_command", { cmd: command });
        addMessage("TX", command);
        setCommand("");
      } catch (err) {
        addMessage("ERROR", `Fallo al enviar: ${err}`);
      }
    }
  };

  const connectWiFi = async () => {
    try {
      addMessage("SYSTEM", "Iniciando WebSocket en Rust...");
      await invoke("start_wifi_session");
    } catch (err) {
      addMessage("ERROR", `Fallo en el backend: ${err}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-700 max-w-[1400px] mx-auto w-full p-4">

      {/* HEADER DINÁMICO */}
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
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
            isConnected ? 'bg-success/10 border-success/20 text-success' : 'bg-error/10 border-error/20 text-error'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-error'}`}></div>
            <span className="text-[10px] font-black uppercase">
              {isConnected ? 'Sistema Conectado' : 'Sistema Desconectado'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-base-500">v1.0.0</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* COLUMNA IZQUIERDA: ESTADO Y ACCIONES */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* Panel de Telemetría */}
          <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2 border-b border-base-200 pb-2">
              <Activity size={20} className="text-primary" />
              <h2 className="text-[11px] font-black uppercase tracking-wider">Estado del Sistema</h2>
            </div>
            <div className="space-y-1">
              {[
                { label: 'Batería', val: isConnected ? '12.4 V' : '-- %', icon: Battery },
                { label: 'Temp. Interna', val: isConnected ? '24.2 °C' : '-- °C', icon: Thermometer },
                { label: 'Presión', val: isConnected ? '1013 mbar' : '-- mbar', icon: Gauge },
                { label: 'Profundidad', val: isConnected ? '0.0 m' : '-- m', icon: Anchor },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group py-1">
                  <div className="flex items-center gap-2">
                    <item.icon size={18} className="text-base-400" />
                    <span className="text-sm text-base-500 font-medium">{item.label}</span>
                  </div>
                  <span className={`text-sm font-mono font-bold transition-colors ${isConnected ? 'text-primary' : 'text-base-400'}`}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Conexión Dual */}
          <div className="bg-base-100 rounded-2xl border border-base-300 p-5 shadow-sm">
            <h2 className="text-sm font-bold mb-1">Conexión del Planeador</h2>
            <p className="text-[10px] text-base-500 mb-4 font-medium uppercase tracking-tight">Seleccione método de enlace</p>

            <div className="space-y-3">
              {/* Opción WiFi */}
              <button
                onClick={connectWiFi}
                disabled={isConnected}
                className={`btn btn-sm w-full font-bold gap-2 normal-case transition-all ${
                  isConnected ? 'btn-success text-white' : 'bg-base-200 border-base-300 hover:border-primary'
                }`}
              >
                <Wifi size={14} /> Wi-Fi (192.168.4.1)
              </button>

              <div className="divider text-[9px] uppercase font-bold opacity-30">o</div>

              {/* Opción UART con Selector de Puerto */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <select 
                    className="select select-bordered select-xs flex-1 font-mono text-[10px] focus:outline-none"
                    value={selectedPort}
                    onChange={(e) => setSelectedPort(e.target.value)}
                    disabled={isConnected || availablePorts.length === 0}
                  >
                    {availablePorts.length > 0 ? (
                      availablePorts.map((port) => <option key={port} value={port}>{port}</option>)
                    ) : (
                      <option>No hay puertos COM</option>
                    )}
                  </select>
                  <button 
                    onClick={scanPorts} 
                    className="btn btn-square btn-xs bg-base-200 border-base-300"
                    title="Actualizar puertos"
                  >
                    <RefreshCw size={12} className={availablePorts.length === 0 ? "animate-pulse" : ""} />
                  </button>
                </div>
                
                <button 
                  disabled={isConnected || availablePorts.length === 0}
                  className="btn btn-xs h-8 bg-base-800 text-white font-bold gap-2 normal-case hover:bg-black"
                >
                  <Cpu size={14} /> Conectar UART
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate('/config/internal')}
              className="btn btn-primary btn-sm w-full font-bold shadow-md shadow-primary/20 mt-4"
            >
              Configurar Actuadores
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: TERMINAL DE COMANDOS */}
        <div className="lg:col-span-8 h-[500px] flex flex-col">
          <div className="bg-base-100 rounded-2xl border border-base-300 flex-1 flex flex-col shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-base-200 bg-base-200/20">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-primary" />
                <h2 className="text-[11px] font-black uppercase tracking-wider">Terminal de Comandos</h2>
              </div>
              <button
                onClick={() => setMessages([])}
                className="text-[9px] font-bold text-base-400 hover:text-error uppercase tracking-tighter"
              >
                Limpiar Terminal
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-[10px] bg-slate-950/5"
            >
              {messages.length === 0 && !isConnected ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <Wifi size={32} className="mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">Esperando Enlace...</p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className="mb-1 flex gap-2 animate-in slide-in-from-left-2 duration-300">
                    <span className="text-base-400 font-bold">[{m.time}]</span>
                    <span className={`font-black ${
                      m.type === 'ERROR' ? 'text-error' :
                      m.type === 'SYSTEM' ? 'text-primary' : 'text-success'
                    }`}>
                      {m.type === 'RX' ? '>>' : '::'}
                    </span>
                    <span className="text-base-content break-all">{m.text}</span>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-base-200/50 border-t border-base-300">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  autoFocus
                  disabled={!isConnected}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder={isConnected ? "Enviar comando a Glider..." : "Sistema fuera de línea"}
                  className="flex-1 bg-base-100 border border-base-300 rounded-lg px-3 py-1.5 text-xs font-mono outline-none focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={!isConnected || !command.trim()}
                  className="btn btn-square btn-sm btn-primary shadow-sm"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}