import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('¡Login exitoso!');
        } catch (err) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <div className="max-w-md w-full p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Access</h2>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white transition-all"
                        placeholder="tu@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white transition-all"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-900/20"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;