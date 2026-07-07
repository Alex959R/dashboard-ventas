import type { Producto } from '../types';

const CLAVE_PRODUCTOS = 'dashboard-ventas-productos';

export const guardarProductos = (productos: Producto[]): void => {
  try {
    const texto = JSON.stringify(productos);
    localStorage.setItem(CLAVE_PRODUCTOS, texto);
  } catch (error) {
    console.error('Error al guardar productos:', error);
  }
};

export const cargarProductos = (): Producto[] | null => {
  try {
    const texto = localStorage.getItem(CLAVE_PRODUCTOS);
    if (texto === null) return null;
    return JSON.parse(texto) as Producto[];
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return null;
  }
};

export const limpiarProductos = (): void => {
  localStorage.removeItem(CLAVE_PRODUCTOS);
};

