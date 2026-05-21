import './Header.css'

interface Headerprops{
    nombreUsuario : string;
    notificaciones ? : number;
} 


function Header(props: Headerprops){
    return (
        <header className="header">

        <div className="header-busqueda">

        <input type="text" placeholder="Buscar..." />

        </div>

        <div className="hedaer-derecha">

        <div className="header-notificaciones"> 🔔 {props.notificaciones && props.notificaciones>

            0 && (<span className="bagde"> props.notificaciones</span>)}
        </div>
        <div className="header-usuario">
            <div className = 'Avatar'>{props.nombreUsuario.charAt(0)}</div>



        </div>
        </div>
        </header>
    )
}
export default Header;
