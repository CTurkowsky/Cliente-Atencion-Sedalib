import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen transition-all duration-500 ease-in-out opacity-0 animate-fadeIn'>
      <div className='p-8 text-center animate__animated animate__fadeInUp'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-medium mb-4 animate-pulse'>
          Bienvenido a Gestion de Atenciones 📞
        </h1>
        <p className='text-sm sm:text-base md:text-lg lg:text-xl mb-8'>
          Buen inicio de turno
        </p>
        <div className='flex items-center justify-center'>
          <NavLink to='/registrar-atencion'>
            <button className='px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-breaker-bay-400 text-white font-bold rounded-full hover:bg-breaker-bay-200 transition duration-300 ease-in-out flex items-center animate-bounce hover:translate-y-1 transform hover:shadow-lg hover:text-black'>
              Comienza ahora
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
