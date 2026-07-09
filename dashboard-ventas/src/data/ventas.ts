import type { Producto, Pedido } from "../types";
export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Laptop HP 15"',
    categoria: "Tecnología",
    unidadesVendidas: 5,
    precioUnitario: 2500000,
  },
  {
    id: 2,
    nombre: "Mouse inalámbrico",
    categoria: "Tecnología",
    unidadesVendidas: 12,
    precioUnitario: 45000,
  },
  {
    id: 3,
    nombre: "Teclado mecánico",
    categoria: "Tecnología",
    unidadesVendidas: 8,
    precioUnitario: 180000,
  },
  {
    id: 4,
    nombre: "Silla ergonómica",
    categoria: "Muebles",
    unidadesVendidas: 3,
    precioUnitario: 650000,
  },
  {
    id: 5,
    nombre: "Escritorio",
    categoria: "Muebles",
    unidadesVendidas: 4,
    precioUnitario: 480000,
  },
  {
    id: 6,
    nombre: "Audífonos Bluetooth",
    categoria: "Tecnología",
    unidadesVendidas: 15,
    precioUnitario: 120000,
  },
];
export const pedidos: Pedido[] = [
  { id: 1001, cliente: "Ana López", total: 2500000, estado: "entregado" },
  { id: 1002, cliente: "Carlos Pérez", total: 480000, estado: "pendiente" },
  { id: 1003, cliente: "María González", total: 180000, estado: "enviado" },
  { id: 1004, cliente: "Juan Rodríguez", total: 765000, estado: "entregado" },
  { id: 1005, cliente: "Laura Martínez", total: 120000, estado: "pendiente" },
];
export const ingresosMensuales: { mes: string; ingresos: number }[] = [
  { mes: 'Ene', ingresos: 300000 },
  { mes: 'Feb', ingresos: 320000 },
  { mes: 'Mar', ingresos: 340000 },
  { mes: 'Abr', ingresos: 350000 },
  { mes: 'May', ingresos: 360000 },
  { mes: 'Jun', ingresos: 370000 },
  { mes: 'Jul', ingresos: 350000 },
  { mes: 'Ago', ingresos: 340000 },
  { mes: 'Sep', ingresos: 330000 },
  { mes: 'Oct', ingresos: 310000 },
  { mes: 'Nov', ingresos: 290000 },
  { mes: 'Dic', ingresos: 385000 },
];
