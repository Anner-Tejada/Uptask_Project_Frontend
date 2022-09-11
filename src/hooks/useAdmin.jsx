import useProyectos from "../hooks/useProyecto";
import useAuth from "../hooks/useAuth";
const useAdmin = () => {
  const { proyecto } = useProyectos();
  const { auth } = useAuth();
  return proyecto.creador == auth._id;
}
export default useAdmin
