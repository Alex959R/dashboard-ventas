import { useState, useEffect } from 'react';
import type { Producto } from '../types';
import './FormularioProducto.css';

interface FormularioProductoProps {
  productoEditar: Producto | null;
  onGuardar: (datos: Omit<Producto, 'id'> | Producto) => void;
  onCancelar: () => void;
}

const productoVacio = {
  nombre: '',
  categoria: '',
  unidadesVendidas: 0,
  precioUnitario: 0,
};

function FormularioProducto(props: FormularioProductoProps) {
  const [datos, setDatos] = useState(productoVacio);

  useEffect(() => {
    if (props.productoEditar) {
      setDatos({
        nombre: props.productoEditar.nombre,
        categoria: props.productoEditar.categoria,
        unidadesVendidas: props.productoEditar.unidadesVendidas,
        precioUnitario: props.productoEditar.precioUnitario,
      });
    } else {
      setDatos(productoVacio);
    }
  }, [props.productoEditar]);

  const manejarCambio = (campo: string, valor: string | number) => {
    setDatos({ ...datos, [campo]: valor });
  };

  const enviar = () => {
    const productoCompleto = props.productoEditar
      ? { ...datos, id: props.productoEditar.id }
      : datos;
    props.onGuardar(productoCompleto as Producto);
  };

  return (
    <div className="formulario-fondo">
      <div className="formulario-tarjeta">
        <h3>{props.productoEditar ? 'Editar producto' : 'Nuevo producto'}</h3>
        <div className="campo">
          <label>Nombre</label>
          <input
            type="text"
            value={datos.nombre}
            onChange={(e) => manejarCambio('nombre', e.target.value)}
          />
        </div>
        <div className="campo">
          <label>Categoría</label>
          <input
            type="text"
            value={datos.categoria}
            onChange={(e) => manejarCambio('categoria', e.target.value)}
          />
        </div>
        <div className="campo">
          <label>Unidades vendidas</label>
          <input
            type="number"
            value={datos.unidadesVendidas}
            onChange={(e) => manejarCambio('unidadesVendidas', Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label>Precio unitario</label>
          <input
            type="number"
            value={datos.precioUnitario}
            onChange={(e) => manejarCambio('precioUnitario', Number(e.target.value))}
          />
        </div>
        <div className="botones">
          <button className="btn-guardar" onClick={enviar}>
            Guardar
          </button>
          <button className="btn-cancelar" onClick={props.onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;