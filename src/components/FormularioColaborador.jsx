import { useState } from "react";
import useProyectos from "../hooks/useProyecto";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    submitColaborador(email);
  };
  const { msg } = alerta;
  return (
    <form
      className="bg-gray-300 py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label htmlFor="email" className="uppercase text-sm">
          Email de colaborador
        </label>
        <input
          id="email"
          type="email"
          className=" focus:outline-none w-full p-2 mt-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="bg-stone-700 text-white cursor-pointer transition-colors rounded w-full p-3 mt-2 uppercase text-center"
        value="Buscar Colaborador"
      />
    </form>
  );
};

export default FormularioColaborador;
