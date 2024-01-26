import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../hooks/useAuthStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthLayout } from '../layout/AuthLayout'
import { useLoginValidationSchema } from '../../hooks'
export const LoginPage = () => {
  const { startLogin } = useAuthStore()
  const validationSchema = useLoginValidationSchema()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })
  const onSubmit = (data) => {
    startLogin(data)
    reset()
  }

  return (
    <AuthLayout title='Iniciar sesión'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
          type='email'
          placeholder='Correo'
          {...register('email', { required: true })}
        />
        {errors.email && (
          <div
            className='flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              ></path>
            </svg>
            <div>{errors.email.message}</div>
          </div>
        )}

        <input
          className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
          type='password'
          placeholder='Contraseña'
          {...register('password', { required: true })}
        />
        {errors.password && (
          <div
            className='flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              ></path>
            </svg>
            <div>{errors.password.message}</div>
          </div>
        )}
        <button className='block w-full rounded-lg mt-4 px-5 py-3 text-sm font-medium text-white bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700'>
          Ingresar
        </button>
      </form>
    </AuthLayout>
  )
}
