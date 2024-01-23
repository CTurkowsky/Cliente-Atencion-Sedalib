import { useForm } from 'react-hook-form'
import { useUsuarioStore } from '../../hooks'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const RegisterUsuarioPage = () => {
  const { register, handleSubmit, reset, setValue } = useForm()
  const { startSavingUsuario, getUsuario } = useUsuarioStore()
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()
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
    reset()
  }
  return (
    <div className='mx-auto  px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto  bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-xl font-semibold mb-4 text-center'> {isEditing ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='text'
            placeholder='Nombre'
            {...register('nombre')}
          />
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='text'
            placeholder='Apellidos'
            {...register('apellidos')}
          />
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='text'
            placeholder='Correo'
            {...register('email')}
          />
          <input
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            type='password'
            placeholder={isEditing ? 'Nueva Contraseña' : 'Contraseña'}
            {...register('password')}
          />
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
          <button className='block w-full rounded-lg mt-4 px-5 py-3 text-sm font-medium  text-white   bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700'>
            {isEditing ? 'Guardar Cambios' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
