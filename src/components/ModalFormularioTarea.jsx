import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import useProyectos from "../hooks/useProyecto";
import Alerta from "./Alerta";

const ModalFormularioTarea = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [id, setId] = useState("");
    const { alerta, mostrarAlerta, modalFormTarea, handleModalTarea, submitTarea, tarea} = useProyectos();

    const params = useParams();
    
    useEffect(()=> {
        if (tarea?._id) {
            setId(tarea._id);
            setNombre(tarea.nombre);
            setPrioridad(tarea.prioridad);
            setFechaEntrega(tarea.fechaEntrega.split('T')[0]);
            setDescripcion(tarea.descripcion);
            return
        }
        setId('');
        setNombre('');
        setPrioridad('');
        setFechaEntrega('');
        setDescripcion('');

    }, [tarea]);

    const PRIORIDAD = ["Baja", "Media", "Alta"];
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, prioridad, fechaEntrega, descripcion,].includes('')) {
            mostrarAlerta({
                msg: "Todo los campos son obligatorios",
                error: true
            })
            return
        }

        await submitTarea({
            id,
            nombre,
            prioridad,
            fechaEntrega,
            descripcion,
            proyecto: params.id
        });
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setPrioridad('');
    };

    const {msg} = alerta;

    return (
        <Transition.Root show={modalFormTarea} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleModalTarea}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalTarea}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl leading-6 font-bold text-gray-900"
                                    >
                                        {id ? 'Editar tarea':'Crear tarea'}
                                    </Dialog.Title>
                                    <form className="my-10" onSubmit={handleSubmit}>
                                        {msg && <Alerta alerta={alerta}/>}
                                        <div>
                                            <label htmlFor="nombre" className="text-lg">
                                                Nombre de la tarea
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                className="border-2 w-full p-2 mt-2 rounded-md"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="prioridad" className="text-lg">
                                                Prioridad
                                            </label>
                                            <select
                                                id="prioridad"
                                                className="border-2 w-full p-2 mt-2 rounded-md"
                                                value={prioridad}
                                                onChange={(e) => setPrioridad(e.target.value)}
                                            >
                                                <option value="">--Seleccionar--</option>
                                                {PRIORIDAD.map((opcion) => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="fecha" className="text-lg">
                                                Fecha de entrega
                                            </label>
                                            <input
                                                type="date"
                                                id="fecha"
                                                className="border-2 w-full p-2 mt-2 rounded-md"
                                                value={fechaEntrega}
                                                onChange={(e) => setFechaEntrega(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="descripcion" className="text-lg">
                                                Descripci??n
                                            </label>
                                            <textarea
                                                id="descripcion"
                                                className="border-2 w-full p-2 mt-2 rounded-md"
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            className="bg-stone-700 text-white cursor-pointer transition-colors rounded w-full p-3 mt-2 uppercase text-center"
                                            value={id ? 'Guardar cambios' : 'Guardar tarea'}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalFormularioTarea;
