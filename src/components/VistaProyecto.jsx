import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VistaProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;

  return (
    <div className="bg-gray-100 mt-4 rounded p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre} <span className="text-xs text-slate-600">{cliente}</span>
        </p>
        {auth._id !== creador && <p className="p-1 text-xs rounded-lg text-white bg-green-500 uppercase">Colaborador</p>}
      </div>
      <Link to={`${_id}`}>
        <span className="text-red-800">Ver Proyecto</span>
      </Link>
    </div>
  );
};

export default VistaProyecto;
