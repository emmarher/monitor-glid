import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function RealTimeChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Inicialización con Canvas para velocidad
      chartInstance.current = echarts.init(chartRef.current, 'dark');
      
      const option = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'time', splitLine: { show: false } },
        yAxis: { type: 'value', boundaryGap: [0, '100%'] },
        series: [{
          name: 'Datos UART',
          type: 'line',
          showSymbol: false,
          data: [],
          lineStyle: { color: '#570df8' } // Color primary de DaisyUI
        }]
      };

      chartInstance.current.setOption(option);

      // Redimensionar automáticamente si la ventana cambia
      const resizeObserver = new ResizeObserver(() => {
        chartInstance.current?.resize();
      });
      resizeObserver.observe(chartRef.current);

      return () => {
        chartInstance.current?.dispose();
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div className="card bg-base-200 shadow-xl p-4 w-full h-[450px]">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}