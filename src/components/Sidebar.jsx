import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {

  const {auth} = useAuth();


  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
        <p className='text-xl text-red-800'>Hola: {auth.nombre}</p>
        <Link
            to="crear-proyecto"
            className=' bg-stone-700 w-full p-3 uppercase block text-center mt-5 rounded-lg text-white'
        >Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar
