import EditableText from './EditableText';

const Hero = ({ user }) => {
    return (
        <section className="...">
            <div>
                <span className="...">Estudiante de Ingeniería</span>

                {/* Usamos el componente editable para el título */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 leading-tight">
                    <EditableText
                        user={user}
                        docId="hero"
                        field="title"
                        initialValue="Construyendo con Código y Madera."
                    />
                </h1>

                <p className="mt-6 text-slate-400 text-lg leading-relaxed">
                    <EditableText
                        user={user}
                        docId="hero"
                        field="description"
                        initialValue="Tiro líneas en React y Node, pero también paso mis findes entre viruta..."
                    />
                </p>

                {/* ... botones ... */}
            </div>
            {/* ... imagen ... */}
        </section>
    );
};

export default Hero;
