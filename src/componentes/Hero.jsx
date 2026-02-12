const Hero = () => {
    return (
        <section className="pt-32 pb-16 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">Estudiante de Ingeniería</span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 leading-tight">
                    Construyendo con <span className="text-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Código y Madera.</span>
                </h1>
                <p className="mt-6 text-slate-400 text-lg leading-relaxed">
                    Tiro líneas en <span className="text-slate-200">React y Node</span>, pero también paso mis findes entre viruta haciendo muebles y capturando momentos con la cámara.
                    Un enfoque de ingeniería aplicado a todo lo que fabrico.
                </p>
                <div className="mt-10 flex gap-4">
                    <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/10">
                        Ver Proyectos
                    </button>
                    <button className="px-8 py-4 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                        Contacto
                    </button>
                </div>
            </div>

            {/* Placeholder para una foto tuya o de tus muebles/fotos */}
            <div className="relative">
                <div className="aspect-square bg-linear-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl border border-slate-700 flex items-center justify-center overflow-hidden group">
                    <div className="text-slate-500 group-hover:scale-110 transition-transform duration-500">
                        {/* Acá después meteremos una imagen copada */}
                        [Espacio para foto de Woodworking/Fotografía]
                    </div>
                </div>
                {/* Un detalle decorativo "tech" */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
            </div>
        </section>
    );
};

export default Hero;