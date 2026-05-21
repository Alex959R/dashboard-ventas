import { useState } from "react";
import {SeccionId} from "./components/sidebar";
import Sidebar from "./components/sidebar";
import inicio from "./pages/inicio";
import './App.css'
import Inicio from "./pages/inicio";


function App() {
  const [seccionActiva, setSeccionActiva] = useState<SeccionId>('Inicio');
  
  const renderizarContenido = () => { 
    if(seccionActiva === 'Inicio'){
      return <inicio />
    } 
    return <Inicio />;
  return {
    <div className="app-layout">
       <Sidebar seccionActiva={seccionActiva} onSeleccionarSeccion={setSeccionActiva} />
    <div 
  }