import { useEffect } from "react";
import useProyectos from "../hooks/useProyecto"
import VistaProyecto from "../components/VistaProyecto";
import Alerta from "../components/Alerta";
const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();
  const {msg} = alerta;
  return (
    <>
      <h1 className="text-4xl">Proyectos</h1>
      {msg && <Alerta alerta={alerta}/>}
      <div>
        {proyectos.length ? proyectos.map(proyecto => (
          <VistaProyecto
            key={proyecto._id}
            proyecto = {proyecto}
          />
        ))
        : <p className="bg-gray-100 mt-10 rounded p-5">No hay proyectos aún</p>}
      </div>
    </>
  )
}

export default Proyectos
