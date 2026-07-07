import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

interface LoginProps {
  onIrARegistro: () => void;
}

function Login(props: LoginProps) {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const manejarEnvio = () => {
    setError('');
    if (email.trim() === '' || password.trim() === '') {
      setError('Complete todos los campos.');
      return;
    }
    const resultado = iniciarSesion(email, password);
    if (!resultado.ok) {
      setError(resultado.mensaje);
    }
  };

  const manejarTecla = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      manejarEnvio();
    }
  };

  return (
    <div className="auth-fondo">
      <div className="auth-tarjeta">
        <div className="auth-logo">📊 VentasApp</div>
        <h2>Iniciar sesión</h2>
        <p className="auth-subtitulo">Ingrese sus credenciales para continuar</p>

        <div className="auth-campo">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={manejarTecla}
            placeholder="usuario@ventas.com"
          />
        </div>

        <div className="auth-campo">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={manejarTecla}
            placeholder="••••••••"
          />
        </div>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <button className="auth-boton-principal" onClick={manejarEnvio}>
          Ingresar
        </button>

        <div className="auth-separador">¿No tiene cuenta?</div>

        <button className="auth-boton-secundario" onClick={props.onIrARegistro}>
          Crear cuenta nueva
        </button>

        <div className="auth-ayuda">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>admin@ventas.com / admin123</p>
          <p>vendedor@ventas.com / vendedor123</p>
          <p>visor@ventas.com / visor123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;