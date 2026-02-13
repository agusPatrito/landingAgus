import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';
import { Loader2, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setIsLoading(true);

        try {
            // Usamos .trim() para limpiar espacios accidentales
            await signInWithEmailAndPassword(auth, email.trim(), password);
            toast.success('¡Bienvenido, fiera! Login exitoso.');
        } catch (err) {
            console.error("Error completo:", err);
            toast.error('Credenciales incorrectas', {
                description: 'Revisá el mail y la contraseña.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full p-8 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">Admin Login</h2>

            <form onSubmit={handleLogin} className="space-y-6">
                {/* INPUT DE EMAIL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>
                </div>

                {/* INPUT DE CONTRASEÑA */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Contraseña</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {/* BOTÓN DE ACCIÓN */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Validando...
                        </>
                    ) : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default Login;