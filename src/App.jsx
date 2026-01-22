import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TerminalFooter } from "./layouts/TerminalFooter";
import { SubLayout } from './layouts/SubLayout';
import { InternalSensors } from './pages/maintenance/InternalSensors';
import { RealTimeChart } from './components/RealTimeChart';
import { Home } from './pages/Home';

// Componente para manejar la lógica del layout condicional
function AppContent() {
  const location = useLocation();
  
  // Flag: Solo se muestra el footer si la ruta NO es la raíz "/"
  const showFooter = location.pathname !== "/";

  const maintenanceSubRoutes = [
    { name: 'Sensores Internos', path: 'internal' },
    { name: 'Sensores Externos', path: 'external' },
    { name: 'Actuadores', path: 'actuators' },
    { name: 'Registros del Sistema', path: 'logs' },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-base-100 text-base-content font-sans">
      {/* NAVBAR: Fijo en la parte superior */}
      <Navbar />

      {/* CONTENEDOR CENTRAL */}
      <main className="pt-16 flex-1 w-full overflow-hidden flex flex-col bg-base-200">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* RUTA 1: MONITOR */}
            <Route path="/monitor" element={<SubLayout mainPath="monitor" />}>
              <Route path="general" element={<div className="p-6">Dashboard Monitor</div>} />
              <Route path="charts" element={<RealTimeChart />} />
              <Route index element={<Navigate to="general" />} />
            </Route>

            {/* RUTA DE MAINTENANCE */}
            <Route
              path="/config"
              element={<SubLayout mainPath="config" subRoutes={maintenanceSubRoutes} />}
            >
              <Route path="internal" element={<InternalSensors />} />
              <Route path="external" element={<div className="p-4">External Sensors</div>} />
              <Route path="actuators" element={<div className="p-4">Actuators</div>} />
              <Route index element={<Navigate to="internal" />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>

      {/* FOOTER CONDICIONAL: Solo aparece si showFooter es true */}
      {showFooter && <TerminalFooter />}
    </div>
  );
}

// El componente principal debe envolver todo en el Provider de Router
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;