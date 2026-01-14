import React from 'react';
import { 
  Gauge, Clock, Zap, Droplets, 
  Thermometer, Activity, Compass, 
  MapPin, Wind, Layers, Waves 
} from 'lucide-react';

const SensorCard = ({ title, children, icon: Icon }) => (
  /* CAMBIO: bg-base-100 en lugar de bg-white, border-base-300 en lugar de slate-200 */
  <div className="bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm hover:border-primary transition-all duration-300 group">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-primary" />}
        {/* CAMBIO: text-base-content con opacidad para el título */}
        <h3 className="text-[11px] font-bold text-base-content/70 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
    </div>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const ValueLine = ({ label, value, unit, color = "text-base-content" }) => (
  <div className="flex items-baseline gap-2">
    {/* CAMBIO: text-base-content/50 para etiquetas secundarias */}
    {label && <span className="text-[10px] text-base-content/50 font-mono w-10">{label}:</span>}
    <span className={`text-xl font-black font-mono tracking-tighter ${color}`}>{value}</span>
    <span className="text-[10px] font-bold text-base-content/40 uppercase">{unit}</span>
  </div>
);

export function InternalSensors() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <SensorCard title="Presión" icon={Gauge}>
          <ValueLine label="PSI" value="14.70" unit="psi" />
          <ValueLine label="BAR" value="1.01" unit="bar" />
          <ValueLine label="VOLT" value="5.02" unit="v" color="text-info" />
        </SensorCard>

        <SensorCard title="RTC" icon={Clock}>
          <div className="py-2">
            <span className="text-3xl font-black font-mono text-base-content">12:45:08</span>
          </div>
          <p className="text-[9px] text-base-content/50 font-bold uppercase italic">System Epoch Sync</p>
        </SensorCard>

        <SensorCard title="Conductividad" icon={Activity}>
          <ValueLine value="45.23" unit="mS/cm" color="text-success" />
          <div className="h-1 w-full bg-base-300 rounded-full mt-2">
            <div className="bg-success h-full w-[45%]" />
          </div>
        </SensorCard>

        <SensorCard title="Densidad" icon={Layers}>
          <ValueLine value="1025.4" unit="kg/m³" />
        </SensorCard>

        <SensorCard title="Humedad" icon={Droplets}>
          <ValueLine value="14.2" unit="%" color="text-info" />
        </SensorCard>

        <SensorCard title="Voltaje" icon={Zap}>
          <ValueLine value="14.2" unit="v" color="text-primary" />
          <div className="flex items-center gap-1 text-[9px] text-primary font-bold mt-2 border-t pt-1 border-base-300">
            BUS VOLTAGE NOMINAL
          </div>
        </SensorCard>

        <SensorCard title="Salinidad" icon={Waves}>
          <ValueLine value="34.81" unit="mS/cm" />
        </SensorCard>

        <SensorCard title="Compás" icon={Compass}>
          <div className="grid grid-cols-3 gap-1 mt-1">
            <div className="text-center">
              <p className="text-[8px] font-bold text-base-content/50">PITCH</p>
              <p className="font-mono font-bold text-xs text-info">+12.4°</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-base-content/50">ROLL</p>
              <p className="font-mono font-bold text-xs text-error">-3.1°</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-base-content/50">YAW</p>
              <p className="font-mono font-bold text-xs">214.8°</p>
            </div>
          </div>
        </SensorCard>

        <SensorCard title="Temperatura" icon={Thermometer}>
          <ValueLine value="22.5" unit="°C" color="text-warning" />
          <ValueLine value="72.5" unit="°F" color="text-warning/80" />
        </SensorCard>

        <SensorCard title="Corriente" icon={Wind}>
          <ValueLine value="1.24" unit="A" />
        </SensorCard>

        <SensorCard title="Salinidad PSU" icon={Waves}>
          <ValueLine value="35.12" unit="psu" />
        </SensorCard>

        <SensorCard title="GPS" icon={MapPin}>
          <div className="bg-base-200 p-2 rounded border border-base-300">
            <p className="text-[10px] font-mono leading-tight text-base-content">LAT: 45.3221</p>
            <p className="text-[10px] font-mono leading-tight text-base-content">LON: -122.6765</p>
          </div>
        </SensorCard>

      </div>
    </div>
  );
}