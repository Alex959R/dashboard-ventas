import './TarjetaKPI.css';

interface TarjetaHPIprops{
    titulo:string;
    valor:string;
    color?:string
}

function TarjetaKPI(props: TarjetaHPIprops){
    return(
        <div className="tarjeta-kpi" style={{
            borderTopColor: props.color || '#2e75b6'
        }}>
            <p className="kpi-titulo">{props.titulo}</p>
            <p className="kpi-valor">{props.valor}</p>
        </div>
    );
}
export default TarjetaKPI;