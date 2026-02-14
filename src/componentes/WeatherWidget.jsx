import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, CloudFog, Loader2 } from 'lucide-react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                // Coordenadas de Córdoba, Argentina
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=-31.417993&longitude=-64.181303&current=temperature_2m,weather_code&timezone=auto'
                );

                if (!response.ok) {
                    throw new Error('Error al obtener el clima');
                }

                const data = await response.json();
                setWeather(data.current);
            } catch (err) {
                console.error(err);
                setError('No disponible');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();

        // Actualizar cada 30 minutos
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        // Códigos WMO
        if (code === 0) return <Sun className="w-5 h-5 text-yellow-400" />;
        if (code >= 1 && code <= 3) return <Cloud className="w-5 h-5 text-gray-400" />;
        if (code >= 45 && code <= 48) return <CloudFog className="w-5 h-5 text-gray-400" />;
        if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
        if (code >= 71 && code <= 77) return <CloudSnow className="w-5 h-5 text-white" />;
        if (code >= 80 && code <= 82) return <CloudRain className="w-5 h-5 text-blue-500" />;
        if (code >= 95 && code <= 99) return <CloudLightning className="w-5 h-5 text-purple-400" />;
        return <Sun className="w-5 h-5 text-yellow-400" />;
    };

    if (error) return null; // Si hay error, mejor no mostrar nada para no ensuciar el navbar

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium">
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
            ) : (
                <>
                    {getWeatherIcon(weather.weather_code)}
                    <span>{Math.round(weather.temperature_2m)}°C</span>
                    <span className="hidden lg:inline text-xs text-slate-500 ml-1">CBA</span>
                </>
            )}
        </div>
    );
};

export default WeatherWidget;
