
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-stone-200 border-l-4 border-red-800 p-4" ': 'bg-stone-200 border-l-4 border-green-900 p-4'} text-center rounded uppercase text-md my-10 p-2`} role="alert">
      {alerta.msg}
    </div>
  )
}

export default Alerta
