import { useState } from 'react';
import type { Producto } from '../types';
import { useAuth } from '../context/AuthContext';
import FormularioProducto from '../components/FormularioProducto';
import './Productos.css';

interface ProductosProps {
  productos: Producto[];
  onAgregar: (nuevo: Omit<Producto, 'id'>) => void;
  onActualizar: (producto: Producto) => void;
  onEliminar: (id: number) => void;
  onRestablecer: () => void;
}

function Productos(props: ProductosProps) {
  const { tienePermiso } = useAuth();
  const puedeEditar = tienePermiso(['administrador', 'vendedor']);

  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);

  const abrirNuevo = () => {
    setProductoEditar(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto: Producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
  };

  const guardarProducto = (datos: Omit<Producto, 'id'> | Producto) => {
    if ('id' in datos) {
      props.onActualizar(datos);
    } else {
      props.onAgregar(datos);
    }
    setMostrarFormulario(false);
    setProductoEditar(null);
  };

  const confirmarYEliminar = (producto: Producto) => {
    const confirmado = window.confirm(
      `Está a punto de eliminar el producto "${producto.nombre}". ¿Continuar?`
    );
    if (confirmado) {
      props.onEliminar(producto.id);
    }
  };

  return (
    <div>
      <div className="productos-header">
        <h1>Productos</h1>
        <div>
          {puedeEditar && (
            <>
              <button className="btn-restablecer" onClick={props.onRestablecer}>
                ↻ Restablecer
              </button>
              <button className="btn-nuevo" onClick={abrirNuevo}>
                + Nuevo producto
              </button>
            </>
          )}
        </div>
      </div>
      <p>
        Gestión completa de productos vendidos.
        {!puedeEditar && (
          <span className="aviso-solo-lectura"> (Modo solo lectura)</span>
        )}
      </p>

      <div className="tabla-contenedor">
        <h2>Listado de productos</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Unidades</th>
              <th>Precio</th>
              <th>Total</th>
              {puedeEditar && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {props.productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.unidadesVendidas}</td>
                <td>${producto.precioUnitario.toLocaleString('es-CO')}</td>
                <td>
                  $
                  {(
                    producto.unidadesVendidas * producto.precioUnitario
                  ).toLocaleString('es-CO')}
                </td>
                {puedeEditar && (
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => abrirEditar(producto)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => confirmarYEliminar(producto)}
                    >
                      🗑️
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && puedeEditar && (
        <FormularioProducto
          productoEditar={productoEditar}
          onGuardar={guardarProducto}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}

export default Productos;