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