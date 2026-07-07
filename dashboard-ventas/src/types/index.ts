export interface Producto{
    id:number;
    nombre:string;
    categoria:string;
    unidadesVendidas:number;
    precioUnitario:number;
    
}

export interface Pedido{
    id: number;
    cliente: string;
    total: number;
    estado:'pendiente'|'enviado'|'entregado';
}
export type Rol = 'administrador' | 'vendedor' | 'visualizador';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string; // (solo para simulación, en producción usaríamos hash)
  rol: Rol;
}

// Usuario que se expone a la app SIN la contraseña
export type UsuarioSesion = Omit<Usuario, 'password'>;