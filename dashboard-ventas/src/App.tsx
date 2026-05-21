import { useState } from "react";
import Sidebar, { type SeccionId } from "./components/sidebar";
import Header from "./components/Header";
import './App.css'
import Inicio from "./pages/inicio";


function App() {
  const [seccionActiva, setSeccionActiva] = useState<SeccionId>('Inicio');
  
  const renderizarContenido = () => { 

    if(seccionActiva === 'Inicio'){
      return <Inicio/>;
    } 
    return <Inicio />;
  };
  return(
    <div className="app-layout">

       <Sidebar seccionActiva={seccionActiva} onSeleccionarSeccion={setSeccionActiva} />

    <div className="app-contenido">
      <Header nombreUsuario="Alex Rosero" notificaciones={3}/>
      <main className="app-main">
        {renderizarContenido()}
      </main>
      </div>  
      </div> 
 ) }
 export default App;