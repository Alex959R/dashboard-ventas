import { useState, useEffect } from 'react';
import Sidebar, { type SeccionId } from './components/sidebar';
import Header from './components/Header';
import Inicio from './pages/inicio';
import Productos from './pages/Productos';
import Pedidos from './pages/Pedidos';
import Analisis from './pages/Analisis';
import Configuracion from './pages/Configuracion';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { useAuth } from './context/AuthContext';
import type { Producto } from './types';
import { productos as productosIniciales } from './data/ventas';
import { cargarProductos, guardarProductos } from './utils/almacenamiento';
import Usuarios from './pages/Usuarios';
import './App.css';

type PantallaAuth = 'login' | 'registro';

function App() {
  const { usuario, tienePermiso } = useAuth();
  const [pantallaAuth, setPantallaAuth] = useState<PantallaAuth>('login');
  const [seccionActiva, setSeccionActiva] = useState<SeccionId>('inicio');

  // Estado de productos (se carga de localStorage o datos iniciales)
  const [productos, setProductos] = useState<Producto[]>(() => {
    const guardados = cargarProductos();
    return guardados !== null ? guardados : productosIniciales;
  });

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    guardarProductos(productos);
  }, [productos]);

  // Si la sección actual deja de estar permitida, volver a inicio
  useEffect(() => {
    if (!usuario) return;
   const permisos: Record<SeccionId, boolean> = {
  inicio: true,
  productos: true,
  pedidos: true,
  analisis: tienePermiso(['administrador', 'visualizador']),
  configuracion: tienePermiso(['administrador']),
  usuarios: tienePermiso(['administrador'])
};
    if (!permisos[seccionActiva]) {
      setSeccionActiva('inicio');
    }
  }, [usuario, seccionActiva, tienePermiso]);

  // CRUD de productos
  const agregarProducto = (nuevo: Omit<Producto, 'id'>) => {
    const nuevoId = productos.length > 0
      ? Math.max(...productos.map(p => p.id)) + 1
      : 1;
    setProductos([...productos, { ...nuevo, id: nuevoId }]);
  };

  const actualizarProducto = (editado: Producto) => {
    setProductos(productos.map(p => (p.id === editado.id ? editado : p)));
  };

  const eliminarProducto = (id: number) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const restablecerProductos = () => {
    if (window.confirm('Esto borrará todos los cambios. ¿Continuar?')) {
      setProductos(productosIniciales);
    }
  };

  // Si no hay sesión → login/registro
  if (!usuario) {
    if (pantallaAuth === 'login') {
      return <Login onIrARegistro={() => setPantallaAuth('registro')} />;
    }
    return <Registro onIrALogin={() => setPantallaAuth('login')} />;
  }

  // Renderizar la sección activa
  const renderizarSeccion = () => {
    if (seccionActiva === 'inicio') return <Inicio />;
    if (seccionActiva === 'productos') return (
      <Productos
        productos={productos}
        onAgregar={agregarProducto}
        onActualizar={actualizarProducto}
        onEliminar={eliminarProducto}
        onRestablecer={restablecerProductos}
      />
    );
    if (seccionActiva === 'pedidos') return <Pedidos />;
    if (seccionActiva === 'analisis') return <Analisis />;
    if (seccionActiva === 'configuracion') return <Configuracion />;
    if (seccionActiva === 'usuarios') return <Usuarios />;
    return <Inicio />;
  };

  return (
    <div className="app-layout">
      <Sidebar
        seccionActiva={seccionActiva}
        onSeleccionarSeccion={setSeccionActiva}
      />
      <div className="app-contenido">
        <Header />
        <main className="app-main">
          {renderizarSeccion()}
        </main>
      </div>
    </div>
  );
}

export default App;