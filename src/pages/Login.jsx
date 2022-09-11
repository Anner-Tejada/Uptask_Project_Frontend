import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/proyectos');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  };
  const {msg} = alerta;
  return (
    <div>
      <h1 className="text-zinc-800 font-black text-6xl">
        Inicia sesión y administra tus{" "}
        <span className="text-red-900">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      <form
        onSubmit={handleSubmit}
        className="border-effect bg-gray-100 shadow rounded-lg my-10 p-10"
      >
        <div className="my-5">
          <label
            className="uppercase block "
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="focus:outline-none w-full p-2 mt-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase block"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro"
            className="focus:outline-none w-full p-2 mt-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-stone-700 w-full py-3 text-white uppercase rounded-sm
            hover:cursor-pointer hover:bg-stone-600 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-md hover:text-red-900"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
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

export default Login;
