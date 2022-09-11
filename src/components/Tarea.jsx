import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyecto";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleEditarTarea, handleEliminarTarea, completarTarea } =
    useProyectos();
  const { _id, nombre, fechaEntrega, prioridad, descripcion, estado } = tarea;
  const admin = useAdmin();
  return (
    <div className="border-b border-b-stone-700 p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl text-red-800">{nombre}</p>
        <p className="mb-1 text-sm text-gray-600">Prioridad: {prioridad}</p>
        <p className="mb-1 text-md">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-sm text-gray-600">{descripcion}</p>
        {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completado por: { tarea.completado.nombre }</p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-stone-700 md:mb-1 px-3 py-2 text-white uppercase text-xs rounded-lg"
            onClick={() => handleEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className="bg-stone-700 md:mb-1 px-3 py-2 text-white uppercase text-xs rounded-lg"
          onClick={() => completarTarea(_id)}
        >
          {estado ? 'Completa' : 'Incompleta'}
        </button>

        {admin && (
          <button
            className="bg-stone-700 md:mb-1 px-3 py-2 text-white uppercase text-xs rounded-lg"
            onClick={() => handleEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
