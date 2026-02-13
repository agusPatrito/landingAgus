import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, UserPlus } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
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

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password);
            toast.success('¡Usuario creado con éxito!', {
                description: 'Ya podés ingresar con tus credenciales.'
            });
            resetForm();
            setIsRegister(false);
        } catch (err) {
            console.error("Error al registrar:", err);
            const errorMessages = {
                'auth/email-already-in-use': 'Ese email ya está registrado.',
                'auth/invalid-email': 'El formato del email no es válido.',
                'auth/weak-password': 'La contraseña es muy débil (mínimo 6 caracteres).',
            };
            toast.error('Error al crear usuario', {
                description: errorMessages[err.code] || 'Ocurrió un error inesperado.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        resetForm();
    };

    return (
        <div className="max-w-md w-full p-8 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
                {isRegister ? 'Crear Cuenta' : 'Admin Login'}
            </h2>

            <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-6">
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

                {/* INPUT DE CONFIRMAR CONTRASEÑA (solo en registro) */}
                {isRegister && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1">Confirmar Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* BOTÓN DE ACCIÓN */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 ${isRegister ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20'} disabled:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            {isRegister ? 'Creando...' : 'Validando...'}
                        </>
                    ) : isRegister ? (
                        <>
                            <UserPlus size={20} />
                            Crear Usuario
                        </>
                    ) : 'Ingresar'}
                </button>
            </form>

            {/* TOGGLE LOGIN / REGISTRO */}
            <p className="text-center text-slate-400 text-sm mt-6">
                {isRegister ? '¿Ya tenés cuenta?' : '¿No tenés cuenta?'}{' '}
                <button
                    type="button"
                    onClick={toggleMode}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                    {isRegister ? 'Iniciar Sesión' : 'Crear una cuenta'}
                </button>
            </p>
        </div>
    );
};

export default Login;