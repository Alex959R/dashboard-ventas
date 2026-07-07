import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario, UsuarioSesion, Rol } from '../types';
import { usuariosIniciales } from '../data/usuarios';

// 1. Definir qué expone el contexto
interface AuthContextType {
  usuario: UsuarioSesion | null;
  iniciarSesion: (email: string, password: string) => { ok: boolean; mensaje: string };
  cerrarSesion: () => void;
  registrarUsuario: (nuevo: Omit<Usuario, 'id'>) => { ok: boolean; mensaje: string };
  usuarios: Usuario[];
  tienePermiso: (rolesPermitidos: Rol[]) => boolean;
   eliminarUsuario: (id: number) => { ok: boolean; mensaje: string };
  cambiarRol: (id: number, nuevoRol: Rol) => { ok: boolean; mensaje: string };

}

// 2. Crear el contexto con valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Claves para localStorage
const CLAVE_USUARIOS = 'dashboard-usuarios';
const CLAVE_SESION = 'dashboard-sesion';

// 3. Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  // Cargar usuarios desde localStorage o usar iniciales
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    if (guardados) {
      try {
        return JSON.parse(guardados) as Usuario[];
      } catch {
        return usuariosIniciales;
      }
    }
    return usuariosIniciales;
  });

  // Cargar sesión desde localStorage
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(() => {
    const guardada = localStorage.getItem(CLAVE_SESION);
    if (guardada) {
      try {
        return JSON.parse(guardada) as UsuarioSesion;
      } catch {
        return null;
      }
    }
    return null;
  });

  // Persistir usuarios cuando cambien
  useEffect(() => {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  }, [usuarios]);

  // Persistir sesión cuando cambie
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_SESION);
    }
  }, [usuario]);

  // Iniciar sesión
  const iniciarSesion = (email: string, password: string) => {
    const encontrado = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!encontrado) {
      return { ok: false, mensaje: 'Email o contraseña incorrectos.' };
    }
    const sesion: UsuarioSesion = {
      id: encontrado.id,
      nombre: encontrado.nombre,
      email: encontrado.email,
      rol: encontrado.rol
    };
    setUsuario(sesion);
    return { ok: true, mensaje: 'Bienvenido, ' + encontrado.nombre };
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
  };

  // Registrar nuevo usuario
  const registrarUsuario = (nuevo: Omit<Usuario, 'id'>) => {
    const yaExiste = usuarios.some(
      (u) => u.email.toLowerCase() === nuevo.email.toLowerCase()
    );
    if (yaExiste) {
      return { ok: false, mensaje: 'Ya existe un usuario con ese email.' };
    }
    const nuevoId = usuarios.length > 0
      ? Math.max(...usuarios.map((u) => u.id)) + 1
      : 1;
    const usuarioCompleto: Usuario = { ...nuevo, id: nuevoId };
    setUsuarios([...usuarios, usuarioCompleto]);
    return { ok: true, mensaje: 'Usuario registrado correctamente.' };
  };

  // Eliminar usuario (excepto a sí mismo)
const eliminarUsuario = (id: number): { ok: boolean; mensaje: string } => {
  if (usuario && usuario.id === id) {
    return { ok: false, mensaje: 'No puedes eliminarte a ti mismo.' };
  }
  setUsuarios(usuarios.filter(u => u.id !== id));
  return { ok: true, mensaje: 'Usuario eliminado.' };
};

// Cambiar el rol de un usuario (excepto a sí mismo)
const cambiarRol = (id: number, nuevoRol: Rol): { ok: boolean; mensaje: string } => {
  if (usuario && usuario.id === id) {
    return { ok: false, mensaje: 'No puedes cambiar tu propio rol.' };
  }
  setUsuarios(usuarios.map(u => u.id === id ? { ...u, rol: nuevoRol } : u));
  return { ok: true, mensaje: 'Rol actualizado.' };
};

  // Verificar permisos por rol
  const tienePermiso = (rolesPermitidos: Rol[]): boolean => {
    if (!usuario) return false;
    return rolesPermitidos.includes(usuario.rol);
  };

  const valor: AuthContextType = {
      usuario,
      iniciarSesion,
      cerrarSesion,
      registrarUsuario,
      usuarios,
      tienePermiso,
      eliminarUsuario,
      cambiarRol
  };

  return (
    <AuthContext.Provider value={valor}>
      {props.children}
    </AuthContext.Provider>
  );
}

// 4. Custom hook para consumir el contexto
export function useAuth(): AuthContextType {
  const contexto = useContext(AuthContext);
  if (contexto === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return contexto;
}