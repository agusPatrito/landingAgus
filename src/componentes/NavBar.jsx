const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xl tracking-tighter">AGUS.DEV</span>

                <div className="space-x-8 text-sm font-medium text-slate-300">
                    <a href="#proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a>
                    <a href="#hobbies" className="hover:text-cyan-400 transition-colors">Hobbies</a>
                    <button className="bg-cyan-600 px-4 py-2 rounded-lg text-white hover:bg-cyan-500 transition-all">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;