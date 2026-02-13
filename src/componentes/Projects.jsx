import { Camera, Hammer, Cpu, GraduationCap } from 'lucide-react';
import mesa from '../assets/images/mesa_kerf.jpg';
import fotoPDE from '../assets/images/fotoPDE.jpg';

const Projects = () => {
    return (
        <section id="proyectos" className="py-20 px-4 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold text-white">Lo que hago</h2>
                <div className="h-[1px] flex-1 bg-slate-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[500px]">

                {/* --- PROTAGONISTA: Ingeniería (Sin cambios) --- */}
                <div className="md:col-span-2 md:row-span-2 bg-linear-to-br from-blue-900/20 to-slate-800/40 border border-slate-700 p-8 rounded-3xl flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
                    <div>
                        <div className="flex justify-between items-start">
                            <div className="bg-blue-500/10 w-fit p-3 rounded-2xl mb-6">
                                <Cpu className="text-blue-400" size={28} />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                <GraduationCap size={16} className="text-blue-400" />
                                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">5to Año</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Ingeniería en Sistemas</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Mi enfoque no es solo escribir código, sino diseñar soluciones escalables.
                            Desde la arquitectura del backend hasta la experiencia de usuario en el frontend.
                        </p>
                    </div>
                    <div className="mt-8">
                        <p className="text-slate-500 text-sm">Stack actual: React, Node.js, Firebase, SQL/NoSQL.</p>
                    </div>
                    <Cpu className="absolute -bottom-12 -right-12 text-blue-500/5 w-64 h-64 group-hover:rotate-12 transition-transform duration-700" />
                </div>

                <div className="md:col-span-2 md:row-span-1 group rounded-3xl [perspective:1000px]">
                    <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        {/* Cara FRONTAL */}
                        <div className="absolute inset-0 w-full h-full bg-linear-to-br from-amber-900/20 to-slate-800/40 border border-slate-700 p-8 rounded-3xl flex flex-col justify-center overflow-hidden [backface-visibility:hidden]">
                            <div className="flex items-center gap-4">
                                <div className="bg-amber-500/10 w-fit p-3 rounded-2xl">
                                    <Hammer className="text-amber-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Coffee Table Project</h3>
                                    <p className="text-slate-400 text-sm">Pasa el mouse para ver la técnica.</p>
                                </div>
                            </div>
                            <Hammer className="absolute -bottom-6 -right-6 text-amber-500/5 w-32 h-32" />
                        </div>
                        {/* Cara TRASERA */}
                        <div className="absolute inset-0 w-full h-full bg-slate-900 rounded-3xl overflow-hidden border border-amber-700/50 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                            <img
                                src={mesa}
                                alt="Mesa con Kerf Bending"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>


                {/* --- FOTOGRAFÍA (AHORA TAMBIÉN ES FLIP CARD) --- */}
                <div className="md:col-span-2 md:row-span-1 group rounded-3xl [perspective:1000px]">

                    {/* Flipper */}
                    <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                        {/* Cara FRONTAL */}
                        <div className="absolute inset-0 w-full h-full bg-linear-to-br from-purple-900/20 to-slate-800/40 border border-slate-700 p-8 rounded-3xl flex flex-col justify-center overflow-hidden [backface-visibility:hidden]">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-500/10 w-fit p-3 rounded-2xl">
                                    <Camera className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Fotografía</h3>
                                    <p className="text-slate-400 text-sm">Capturando detalles. Pasa el mouse.</p>
                                </div>
                            </div>
                            <Camera className="absolute -bottom-6 -right-6 text-purple-500/5 w-32 h-32" />
                        </div>


                        <div className="absolute inset-0 w-full h-full bg-slate-900 rounded-3xl overflow-hidden border border-purple-700/50 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                            <img
                                src={fotoPDE}
                                alt="Photography"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                                <p className="text-white font-bold text-sm">Lifestyle Portfolio</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;