export type SeccionId = 'Inicio' | 'productos' | 'pedidos' | 'configuracion';

interface ItemMenu {
    id : SeccionId;
    icono : string;
    texto : string;
}

interface SidebarProps {    
    seccionActiva : SeccionId;
    onSeleccionarSeccion : (seccion: SeccionId) => void;
}

const menu: ItemMenu[] = [


    {

    id: 'Inicio',
    icono:'🏠',
    texto: 'Inicio'
},
{
    id: 'productos',
    icono:'📦',
    texto: 'Productos'
},
{
    id: 'pedidos',
    icono:'🛒',
    texto: 'Pedidos'
},
{
    id: 'configuracion',
    icono: '⚙️',
    texto: 'Configuracion'

}
];

function sidebar (props: SidebarProps){
    return (
        <aside className= "sidebar">
            <div className = "sidebar-logo">
                🤑 <span>VentasApp</span>

            </div>
            <nav >
                <ul >
                    {menu.map((item)=> (
                        <li key={item.id} className={item.id === props.seccionActiva ? 'activo' : ''}
                        onClick={()=> props.onSeleccionarSeccion(item.id)}>
                        <span className= "icono"> {item.icono}
                        </span>
                        <span>{item.texto}</span>
                        </li>
                    
                     ))}

                </ul>
            </nav>

               </aside>
    );

}

export default sidebar;
