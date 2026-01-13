import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SubLayout } from './layouts/SubLayout';
import { InternalSensors } from './pages/maintenance/InternalSensors';;
import { RealTimeChart } from './components/RealTimeChart';
import { Home } from './pages/Home';

// Componente genérico para rellenar vistas
const PlaceholderPage = ({ title }) => (
  <div className="p-6 bg-base-200 rounded-box border border-base-300">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-title">Paquetes</div>
          <div className="stat-value text-primary">2.4k</div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  // Definimos las sub-rutas para Maintenance
  const maintenanceSubRoutes = [
    { name: 'Sensores Internos', path: 'internal' },
    { name: 'Sensores Externos', path: 'external' },
    { name: 'Actuadores', path: 'actuators' },
    { name: 'Registros del Sistema', path: 'logs' }, // Añadimos una 4ta para completar el diseño
  ];

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-100 text-base-content font-sans">
        <Navbar />
        
       {/* Eliminamos 'max-w-6xl' y 'mx-auto' para pegar todo a la izquierda */}
        <main className="pt-16 flex-1 w-full overflow-hidden flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* RUTA 1: MONITOR */}
            <Route path="/monitor" element={<SubLayout mainPath="monitor" />}>
              <Route path="general" element={<PlaceholderPage title="Dashboard Monitor" />} />
              <Route path="charts" element={<RealTimeChart />} />
              <Route path="terminal" element={<PlaceholderPage title="Consola Serial" />} />
              <Route path="settings" element={<PlaceholderPage title="Params de Visualización" />} />
              <Route index element={<Navigate to="general" />} />
            </Route>

           {/* RUTA DE MAINTENANCE (MAINTAINER) */}
            <Route 
              path="/config" 
              element={<SubLayout mainPath="config" subRoutes={maintenanceSubRoutes} />}
            >
              <Route path="internal" element={<InternalSensors />} />
              <Route path="external" element={<div className="p-4">Vista: External Sensors (Coming Soon)</div>} />
              <Route path="actuators" element={<div className="p-4">Vista: Actuators (Coming Soon)</div>} />
              <Route path="logs" element={<div className="p-4">Vista: System Logs (Coming Soon)</div>} />
              <Route index element={<Navigate to="internal" />} />
            </Route>

            {/* RUTA 3: ANÁLISIS */}
            <Route path="/analisis" element={<SubLayout mainPath="analisis" />}>
              <Route path="general" element={<PlaceholderPage title="Resumen de Datos" />} />
              <Route path="charts" element={<PlaceholderPage title="Históricos de Sesión" />} />
              <Route path="terminal" element={<PlaceholderPage title="Análisis de Protocolo" />} />
              <Route path="settings" element={<PlaceholderPage title="Exportar CSV/JSON" />} />
              <Route index element={<Navigate to="general" />} />
            </Route>

            <Route path="/" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
