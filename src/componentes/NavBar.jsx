import { useState } from 'react';
import WeatherWidget from './WeatherWidget';
import { Menu, X } from 'lucide-react';

const Navbar = ({ user, onLoginClick, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xl tracking-tighter">AGUS.DEV</span>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <WeatherWidget />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                    <WeatherWidget />
                    <a href="proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500">{user.email}</span>
                            <button
                                onClick={onLogout}
                                className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="bg-cyan-600 px-4 py-2 rounded-lg text-white hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20"
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
                    <a
                        href="proyectos"
                        className="text-slate-300 hover:text-cyan-400 py-2 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Proyectos
                    </a>

                    {user ? (
                        <>
                            <span className="text-slate-500 text-sm">{user.email}</span>
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsOpen(false);
                                }}
                                className="text-left bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                onLoginClick();
                                setIsOpen(false);
                            }}
                            className="bg-cyan-600 px-4 py-2 rounded-lg text-white hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20 text-center"
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
