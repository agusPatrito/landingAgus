
const Navbar = ({ user, onLoginClick, onLogout }) => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xl tracking-tighter">AGUS.DEV</span>

                <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
                    <a href="proyectos" className="hidden md:block hover:text-cyan-400 transition-colors">Proyectos</a>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 hidden sm:block">{user.email}</span>
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
        </nav>
    );
};

export default Navbar;