import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/clienteAxios.jsx";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-zinc-800 font-black text-6xl">
        Confirma tu <span className="text-red-900">cuenta</span>
      </h1>

      <div>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 text-md hover:text-stone-600"
            to="/"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
