import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyecto";
import useAdmin from "../hooks/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Colaborador from "../components/Colaborador";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import io from "socket.io-client";

let socket;

const Proyecto = () => {
  const params = useParams();
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    submitElimnarTareaProyecto,
    submitEditarTareaProyecto,
    cambiarEstadoTarea
  } = useProyectos();
  const admin = useAdmin();
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", params.id);
  }, []);
  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      console.log(tareaNueva)
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva);
      }
    });
    socket.on("tarea eliminada", tareaEliminada => {
      if (tareaEliminada.proyecto === proyecto._id) {
        submitElimnarTareaProyecto(tareaEliminada);
      }
    })
    socket.on("tarea editada", tareaEditada => {
      if(tareaEditada.proyecto._id === proyecto._id){
        submitEditarTareaProyecto(tareaEditada);
      }
    })
    socket.on("nuevo estado", nuevoEstadoTarea => {
      if(nuevoEstadoTarea.proyecto._id === proyecto._id){
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    })
  });
  const { nombre } = proyecto;
  if (cargando) return "...";
  const { msg } = alerta;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">{nombre}</h1>
        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <Link to={`/proyectos/editar/${params.id}`}>Editar</Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          onClick={handleModalTarea}
          type="button"
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg text-white bg-stone-700 flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Agregar Tarea
        </button>
      )}
      <p className="text-xl mt-10">Tareas del proyecto</p>
      <div className="bg-gray-100 mt-10 rounded shadow p-5">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p>No hay tareas</p>
        )}
      </div>
      <div className="flex items-center justify-between mt-10">
        <p className="text-xl mt-10">Colaboradores</p>
        {admin && (
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="text-gray-400 hover:text-black mt-10"
          >
            Añadir
          </Link>
        )}
      </div>
      <div className="bg-gray-100 mt-10 rounded shadow p-5">
        {proyecto.colaboradores?.length ? (
          proyecto.colaboradores?.map((colaborador) => (
            <Colaborador key={colaborador._id} colaborador={colaborador} />
          ))
        ) : (
          <p>No hay colaboradores</p>
        )}
      </div>

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
