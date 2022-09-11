import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios.jsx";

const Resgistrar = () => {
  // definimos el state
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [alerta, setAlerta] = useState("");

  // function handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, confPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
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

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe ser mayor a 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear el usuario en la API

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setConfPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-zinc-800 font-black text-6xl">
        Crea tu cuenta y administra tus{" "}
        <span className="text-red-900">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="border-effect bg-gray-100 shadow rounded-lg my-10 p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase block"
            htmlFor="email"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de Usuario"
            className="w-full mt-3 p-3 border rounded-md bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase  block"
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
        <div className="my-5">
          <label
            className="uppercase block "
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-md bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase block "
            htmlFor="password"
          >
            Confirmar Password
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
          value="Crear cuenta"
          className="bg-stone-700 w-full py-3 text-white uppercase rounded-sm
            hover:cursor-pointer hover:bg-stone-600 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-md hover:text-red-900"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 text-md hover:text-red-900"
          to="/olvide-password"
        >
          Olvidé mi password
        </Link>
      </nav>
    </div>
  );
};

export default Resgistrar;
