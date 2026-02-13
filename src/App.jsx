import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Navbar from './componentes/NavBar';
import Hero from './componentes/Hero';
import Projects from './componentes/Projects';
import Login from './componentes/Login';
import { Toaster } from 'sonner';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Escuchamos el estado de la sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setShowLogin(false); // Si se loguea, cerramos el formulario
    });
    return () => unsubscribe(); // Limpiamos el listener
  }, []);

  const handleLogout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500/30">
      {/* Pasamos los estados al Navbar */}
      <Toaster position="bottom-right" richColors theme="dark" closeButton />
      <Navbar
        user={user}
        onLoginClick={() => setShowLogin(!showLogin)}
        onLogout={handleLogout}
      />

      <main>
        {/* Si showLogin es true, mostramos el form, sino la landing */}
        {showLogin ? (
          <div className="min-h-screen flex items-center justify-center p-4">
            <Login />
          </div>
        ) : (
          <>
            <Hero user={user} />
            <Projects />
          </>
        )}
      </main>

      {/* Un footer tranqui para cerrar */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 - Agus Patrito • Ingeniería & Woodworking
      </footer>
    </div>
  );
}

export default App;