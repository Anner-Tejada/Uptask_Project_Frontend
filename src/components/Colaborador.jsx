import useProyectos from "../hooks/useProyecto";
import useAdmin from "../hooks/useAdmin";
const Colaborador = ({colaborador}) => {
    const {handleEliminarColaborador} = useProyectos();
    const {nombre, email} = colaborador;
    const admin = useAdmin();
  return (
    <div>
        <div className='border-p p-5 flex justify-between items-center'>
            <div>
                <p>{nombre}</p>
                <p className='text-sm text-gray-500'>{email}</p>
            </div>
            <div>
                {admin &&(
                <button
                    type="button"
                    className='px-4 py-3 text-white uppercase bg-red-600 text-sm rounded-lg'
                    onClick={()=>handleEliminarColaborador(colaborador)}
                >
                    Eliminar
                </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default Colaborador
