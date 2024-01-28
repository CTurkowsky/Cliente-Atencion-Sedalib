import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  return (
  <div className='flex flex-row justify-center items-center h-screen'>
      <div className='w-1/2 text-center p-10'>
        <h1 className='text-4xl font-medium mb-4 animate__animated animate__bounceIn'>
          Bienvenido a Gestión de Atenciones
        </h1>
        <p className='text-xl animate-pulse'>
          Esperamos lo mejor de ti en este turno
        </p>
        <div className='flex align-middle justify-center'>
          <NavLink to='/registrar-atencion'>
            <button
              type='button'
              className='block w-auto bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 rounded-l px-3 py-3 my-4 text-sm font-medium text-white'
            >
              Atender llamada
            </button>
          </NavLink>
        </div>
      </div>
      <div className='w-1/2'>
        <img className='w-full h-auto' src='/call-image.svg' alt='Call Center' />
        <p className='text-center'>
          Image by{' '}
          <a href='https://www.freepik.com/free-vector/customer-support-flat-design-illustration_12983846.htm#query=call%20center&position=3&from_view=search&track=ais&uuid=8b3c547c-30ff-45f5-98ae-99685dcfd962'>
            Freepik
          </a>
        </p>
      </div>
    </div>
  )
}
