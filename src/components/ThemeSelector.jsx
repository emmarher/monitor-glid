import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeSelector() {
  // 1. Intentar cargar el tema guardado, si no, usar 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // 2. Aplicar el tema al atributo data-theme de DaisyUI en el HTML
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    // 3. Guardar la preferencia para la próxima vez que abras la app
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle text-slate-500 hover:text-primary transition-all duration-300"
      title={theme === 'light' ? 'Activar Modo Oscuro' : 'Activar Modo Claro'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="animate-in zoom-in duration-300" />
      ) : (
        <Sun size={20} className="text-yellow-400 animate-in zoom-in duration-300" />
      )}
    </button>
  );
}