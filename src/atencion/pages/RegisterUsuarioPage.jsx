import { useForm } from 'react-hook-form'
import { useRegisterValidationSchema, useUsuarioStore } from '../../hooks'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
export const RegisterUsuarioPage = () => {
  const { startSavingUsuario, getUsuario } = useUsuarioStore()
  const [isEditing, setIsEditing] = useState(false)

  const { id } = useParams()
  const navigator = useNavigate()

  const validationSchema = useRegisterValidationSchema()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })
  useEffect(() => {
    const fetchUsuario = async () => {
      const usuarioData = await getUsuario(id)
      const editing = !!id // Local variable to determine if we are in editing mode
      for (const field in usuarioData) {
        if (field === 'password' && editing) continue
        setValue(field, usuarioData[field])
      }
      setValue('modalidad', usuarioData.modalidad)
    }

    if (id) {
      fetchUsuario()
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [id, getUsuario, setValue])
  const onSubmit = (data) => {
    if (isEditing && data.password === '') {
      delete data.password
    }
    console.log(data)
    startSavingUsuario(data)
    navigator('/listar-usuarios')
    reset()
  }
  return (
    <div className='mx-auto  px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto  bg-white p-8 rounded-lg shadow-lg max-w-md w-full animate__animated animate__fadeInUp'>

        <h2 className='text-xl font-semibold mb-4 text-center'>
          {' '}
          {isEditing ? 'Editar Usuario' : 'Registrar Usuario'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='text'
            placeholder='Nombre'
            {...register('nombre')}
          />
          {errors.nombre && (
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
              <div>{errors.nombre.message}</div>
            </div>
          )}

          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='text'
            placeholder='Apellidos'
            {...register('apellidos')}
          />

          {errors.apellidos && (
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
              <div>{errors.apellidos.message}</div>
            </div>
          )}
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='text'
            placeholder='Correo'
            {...register('email')}
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
            placeholder={isEditing ? 'Nueva Contraseña' : 'Contraseña'}
            {...register('password')}
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
          <div className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'>
            <label>Modalidad</label>
            <select
              className=' w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              {...register('modalidad')}
            >
              <option value='telefono'>Telefono</option>
              <option value='rrss'>RRSS</option>
            </select>
          </div>
          {errors.modalidad && (
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
              <div>{errors.modalidad.message}</div>
            </div>
          )}
          <button className='block w-full rounded-lg mt-4 px-5 py-3 text-sm font-medium  text-white   bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700'>
            {isEditing ? 'Guardar Cambios' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
