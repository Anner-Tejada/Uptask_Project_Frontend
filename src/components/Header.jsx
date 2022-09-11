import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyecto";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";
import '../helpers/ola.css'

const Header = () => {
  const {handleBuscador, cerrarSesionProyectos} = useProyectos();
  const { cerrarSesionAuth } = useAuth();
  const handleCerrarSesion = () =>{
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  }
  return (
    <>
      <header className="px-4 py-5 xD">
        <div className="md:flex md:justify-between">
          <h2 className="text-4xl text-white text-center mb-5 md:mb-0">Elegarth GP</h2>

          <div className="flex flex-col md:flex-row items-center gap-4"> 
            <button
              type="button"
              className="uppercase text-white hover:text-stone-400"
              onClick={handleBuscador}
            >Buscar Proyecto</button>
            <Link to="/proyectos" className="uppercase text-white hover:text-stone-400">
              Proyectos
            </Link>
            <button
              type="button" 
              className="text-sm bg-white p-3 rounded-md"
              onClick={handleCerrarSesion}
            >
              Cerrar Sesión
            </button>
            <Busqueda />
          </div>
        </div>
      </header>
      <svg>
        <filter id="wavy">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed="2"
            ></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20"/>
        </filter>
      </svg>
    </>
  );
};

export default Header;
