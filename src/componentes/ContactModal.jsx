import { X, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const socials = [
        {
            name: 'Email',
            value: 'aguspatrito@gmail.com',
            href: 'mailto:aguspatrito@gmail.com',
            icon: <Mail className="text-red-400" size={24} />,
            color: 'hover:border-red-500/50 hover:bg-red-500/10'
        },
        {
            name: 'GitHub',
            value: 'agusPatrito',
            href: 'https://github.com/agusPatrito',
            icon: <Github className="text-white" size={24} />,
            color: 'hover:border-white/50 hover:bg-white/10'
        },
        {
            name: 'LinkedIn',
            value: 'Agustin Patrito',
            href: 'https://www.linkedin.com/in/agustinpatrito/',
            icon: <Linkedin className="text-blue-400" size={24} />,
            color: 'hover:border-blue-500/50 hover:bg-blue-500/10'
        }
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Hablemos</h2>
                <p className="text-slate-400 mb-8">Elegí donde contactarme. Suelo responder rápido por mail.</p>

                <div className="space-y-4">
                    {socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-800/50 transition-all group ${social.color}`}
                        >
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform">
                                {social.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{social.name}</h3>
                                <p className="text-sm text-slate-400">{social.value}</p>
                            </div>
                            <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
