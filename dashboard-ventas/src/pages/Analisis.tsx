import GraficoArea from '../components/GraficoArea';
import GraficoLineas from '../components/GraficoLineas';
import GraficoBarrasCategorias from '../components/GraficoBarrasCategorias';
import GraficoBarrasProductos from '../components/GraficoBarrasProductos';
import GraficoCircularEstados from '../components/GraficoCircularEstados';
import { ingresosMensuales, pedidos } from '../data/ventas';
import type { Producto } from '../types';

interface AnalisisProps {
  productos: Producto[];
}

function Analisis(props: AnalisisProps) {
  return (
    <div>
      <h1>Análisis de Ventas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1 1 100%' }}>
          <GraficoLineas datos={ingresosMensuales} />
        </div>
        <div style={{ flex: '1 1 100%' }}>
          <GraficoArea datos={ingresosMensuales} />
        </div>
        <div style={{ flex: '1 1 48%' }}>
          <GraficoBarrasCategorias productos={props.productos} />
        </div>
        <div style={{ flex: '1 1 48%' }}>
          <GraficoBarrasProductos productos={props.productos} />
        </div>
        <div style={{ flex: '1 1 48%' }}>
          <GraficoCircularEstados pedidos={pedidos} />
        </div>
      </div>
    </div>
  );
}

export default Analisis;