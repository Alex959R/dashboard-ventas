import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Rol, Usuario } from '../types';
import './Usuarios.css';

function Usuarios() {
  const { usuarios, usuario, eliminarUsuario, cambiarRol } = useAuth();
  const [mensaje, setMensaje] = useState<string>('');

  const manejarEliminar = (user: Usuario) => {
    if (window.confirm(`¿Eliminar a ${user.nombre}?`)) {
      const resultado = eliminarUsuario(user.id);
      setMensaje(resultado.mensaje);
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const manejarCambioRol = (user: Usuario, nuevoRol: Rol) => {
    const resultado = cambiarRol(user.id, nuevoRol);
    setMensaje(resultado.mensaje);
    setTimeout(() => setMensaje(''), 3000);
  };

  if (!usuario || usuario.rol !== 'administrador') {
    return <div className="usuarios-no-permitido">No tienes permiso para ver esta sección.</div>;
  }

  return (
    <div className="usuarios-contenedor">
      <h1>Gestión de Usuarios</h1>
      {mensaje && <div className="usuarios-mensaje">{mensaje}</div>}
      <table className="usuarios-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id} className={u.id === usuario.id ? 'usuario-actual' : ''}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                {u.id === usuario.id ? (
                  u.rol
                ) : (
                  <select
                    value={u.rol}
                    onChange={(e) => manejarCambioRol(u, e.target.value as Rol)}
                  >
                    <option value="administrador">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="visualizador">Visualizador</option>
                  </select>
                )}
              </td>
              <td>
                {u.id !== usuario.id && (
                  <button className="btn-eliminar-usuario" onClick={() => manejarEliminar(u)}>
                    🗑️ Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;