import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Pedido } from "../types";
import "./Graficos.css";

interface GraficoCircularEstadosProps {
  pedidos: Pedido[];
}

interface DatosEstado {
  nombre: string;
  cantidad: number;
}

const COLORES_ESTADO: Record<string, string> = {
  pendiente: "#e67e22",
  enviado: "#2245e0",
  entregado: "#27ae60",
};

function GraficoCircularEstados(props: GraficoCircularEstadosProps) {
  const conteo: Record<string, number> = props.pedidos.reduce(
    (acc, pedido) => {
      acc[pedido.estado] = (acc[pedido.estado] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const datos: DatosEstado[] = Object.keys(conteo).map((estado) => ({
    nombre: estado,
    cantidad: conteo[estado],
  }));

  return (
    <div className="grafico-contenedor">
      <h2>Pedidos por Estado</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={datos}
            dataKey="cantidad"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {datos.map((entrada) => (
              <Cell key={entrada.nombre} fill={COLORES_ESTADO[entrada.nombre] || "#cccccc"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoCircularEstados;