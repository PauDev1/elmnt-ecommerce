import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../utils/api';

const Login = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: user,
          password: pass
        }),
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin(true);
        navigate('/admin');
      }
    } catch (err) {
      console.error("Error de login:", err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-2 text-center italic uppercase tracking-tighter">
          Admin Access
        </h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mb-8">
          Identificación Requerida
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Usuario</label>
            <input
              type="text"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                if (error) setError(false);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
              placeholder=""
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                if (error) setError(false);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
              placeholder=""
            />
          </div>

          {error && (
            <p className="text-red-500 text-[10px] font-bold uppercase text-center ">
              Credenciales incorrectas
            </p>
          )}

          <button type="submit" className="w-full py-4 bg-brand text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all shadow-xl active:scale-95">
            Entrar
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-6 px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-all duration-300 group"
        >
          <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Volver a la tienda
          </span>
        </Link>
      </div>

    </div>
  );
};

export default Login;