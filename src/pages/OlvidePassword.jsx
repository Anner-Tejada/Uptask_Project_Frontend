import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/clienteAxios.jsx";
const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  };

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-zinc-800 font-black text-6xl">
        Recupera tu <span className="text-red-900">cuenta</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form
        onSubmit={handleSubmit}
        className="border-effect bg-gray-100 shadow rounded-lg my-10 p-10"
      >
        <div className="my-5">
          <label
            className="uppercase block"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-md bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-stone-700 w-full py-3 text-white uppercase  rounded-sm
            hover:cursor-pointer hover:bg-stone-600 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-md hover:text-stone-600"
          to="/"
        >
          Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 text-md hover:text-stone-600"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </div>
  );
};

export default OlvidePassword;
