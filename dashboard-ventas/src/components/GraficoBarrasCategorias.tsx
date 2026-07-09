import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Producto } from "../types";
import "./Graficos.css";

interface GraficoBarrasCategoriasProps {
  productos: Producto[];
}

interface DatosGrafico {
  categoria: string;
  totalVentas: number;
}

function GraficoBarrasCategorias(props: GraficoBarrasCategoriasProps) {
  const agrupado: Record<string, number> = props.productos.reduce(
    (acc, producto) => {
      const totalProducto = producto.unidadesVendidas * producto.precioUnitario;
      acc[producto.categoria] = (acc[producto.categoria] || 0) + totalProducto;
      return acc;
    },
    {} as Record<string, number>
  );

  const datos: DatosGrafico[] = Object.keys(agrupado).map((categoria) => ({
    categoria,
    totalVentas: agrupado[categoria],
  }));

  return (
    <div className="grafico-barras-contenedor">
      <h2>Ventas por Categoría</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip formatter={(valor) => "$" + Number(valor).toLocaleString("es-CO")} />
          <Bar dataKey="totalVentas" fill="#8884d8" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoBarrasCategorias;