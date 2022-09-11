import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passModificado, setPassModificado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        // TODO: Mover hacia un cliente axios
        const { data } = await clienteAxios(
          `/usuarios/olvide-password/${token}`
        );
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe ser mayor a 6 caracteres",
        error: true,
      });
      return;
    }
    if (password !== confPassword) {
      setAlerta({
        msg: "Los password no son iguales",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setPassModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

    setPassword("");
    setConfPassword("");
  };

  return (
    <div>
      <h1 className="text-zinc-800 font-black text-6xl">
        Restablece tu <span className="text-red-900">password</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="border-effect bg-zinc-900 shadow rounded-lg my-10 p-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-semibold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-md bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-semibold"
              htmlFor="password2"
            >
              Confirmar Nuevo Password
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Confirmar password"
              className="w-full mt-3 p-3 border rounded-md bg-gray-50"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Restablecer nuevo password"
            className="bg-red-900 w-full py-3 text-white uppercase font-bold rounded-sm
                  hover:cursor-pointer hover:bg-red-800 transition-colors"
          />
        </form>
      )}

      {passModificado && (
        <Link
          className="block text-center my-5 text-slate-500 text-md hover:text-red-900"
          to="/"
        >
          Inicia Sesión
        </Link>
      )}
    </div>
  );
};

export default NuevoPassword;
