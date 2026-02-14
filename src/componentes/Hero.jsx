import EditableText from './EditableText';

const Hero = ({ user }) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900 z-10"></div>

            {/* Background Image (Optional, if you have one) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6 border border-cyan-500/20">
                    Estudiante de Ingeniería
                </span>

                {/* Usamos el componente editable para el título */}
                <h1 className="text-4xl text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    <EditableText
                        user={user}
                        docId="hero"
                        field="title"
                        initialValue="Construyendo con Código y Madera."
                    />
                </h1>

                <p className="mt-4 md:mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                    <EditableText
                        user={user}
                        docId="hero"
                        field="description"
                        initialValue="Tiro líneas en React y Node, pero también paso mis findes entre viruta y herramientas. Buscando siempre la solución más elegante, ya sea en software o en un mueble a medida."
                    />
                </p>

                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#proyectos" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 w-full sm:w-auto">
                        Ver Proyectos
                    </a>
                    <a href="mailto:aguspatrito@gmail.com" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-all w-full sm:w-auto">
                        Contactame
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
