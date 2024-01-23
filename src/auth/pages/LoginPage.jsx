import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../hooks/useAuthStore'

export const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const { startLogin } = useAuthStore()

  const onSubmit = (data) => {
    startLogin(data)
    reset()
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-center text-2xl sm:text-3xl'>Iniciar Sesion</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='email'
            placeholder='Correo'
            {...register('email', { required: true })}
          />
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='password'
            placeholder='Contraseña'
            {...register('password', { required: true })}
          />
          <button className='block w-full rounded-lg mt-4 px-5 py-3 text-sm font-medium text-white bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700'>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
