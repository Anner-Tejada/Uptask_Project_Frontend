import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyecto";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const params = useParams();

  const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos();

  useEffect(()=>{
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
      setCliente(proyecto.cliente);
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorio',
        error: true
      })

      return
    }

    // pasamos los datos hacia el provider
    await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente});
    setId(null);
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');

  }

  const {msg} = alerta;

  return (
    <form 
      className="bg-gray-300 py-10 px-5 md:w-1/2 rounded-lg "
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta}/>}
      <div className="mb-5">
        <label htmlFor="nombre" className="uppercase text-sm">
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="bg-white focus:outline-none w-full p-2 mt-2 rounded-md"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="descripcion" className="uppercase text-sm">
          Descripción 
        </label>
        <textarea
          id="descripcion"
          type="text"
          className="bg-white focus:outline-none w-full p-2 mt-2 rounded-md"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="fecha-entrega" className="uppercase text-sm">
          Fecha de entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="bg-white focus:outline-none w-full p-2 mt-2 rounded-md"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="cliente" className="uppercase text-sm">
          Nombre del Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="bg-white focus:outline-none w-full p-2 mt-2 rounded-md"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>
      <input 
        type="submit"
        value={id ? 'Editar Proyecto' : 'Crear Proyecto'}
        className="bg-stone-700 w-full p-3 rounded cursor-pointer hover:bg-stone-600 text-white"
       />
    </form>
  );
};

export default FormularioProyecto;
