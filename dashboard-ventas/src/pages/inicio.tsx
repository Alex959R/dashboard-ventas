import TarjetaKPI from "../components/TarjetaKPI";
import { useState, useEffect } from 'react';
import { pedidos  , productos } from '../data/ventas';
import TablasProductos from "../components/TablaProductos";  
import ListaPedidos from "../components/ListaPedidos";




function Inicio(){
  const [ingresos, setIngresos] = useState<number>(0);
  const [totalPedidos, setTotalPedidos] = useState<number>(0);
  const [ticketPromedio, setTicketPromedio] = useState<number>(0);

  useEffect(()=>{
    console.log('Calculando KPIs....')
    const sumaIngresos = pedidos.reduce((acomulado, pedido)=>{
        return acomulado + pedido.total;
    }, 0);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIngresos(sumaIngresos);
    setTotalPedidos(pedidos.length);
    setTicketPromedio(sumaIngresos / pedidos.length);

  },[]);

  const formatearMoneda = (valor: number): string =>{
    return '$' + valor.toLocaleString('es-CO');
  }

    return(
      <div style={{padding: '24px'}}>
        <h1>Dashboard de ventas</h1>
         <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          <TarjetaKPI titulo="Ingresos totales" valor={formatearMoneda(ingresos)} color="#27ae60" />
          <TarjetaKPI titulo="Pedidos" valor={totalPedidos.toString()} color="#2a75b0" />
          <TarjetaKPI titulo="Ticket promedio" valor={formatearMoneda(Math.round(ticketPromedio))} color="#e67e22" />
         </div> 
          <TablasProductos productos={productos} />
          <ListaPedidos pedidos={pedidos} />
      </div>
    );
}

export default Inicio;