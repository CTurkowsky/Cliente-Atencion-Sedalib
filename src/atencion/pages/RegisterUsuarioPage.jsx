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
    <>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' placeholder='Nombre' {...register('nombre')} />
        <input type='text' placeholder='Apellidos' {...register('apellidos')} />
        <input type='text' placeholder='Correo' {...register('email')} />
        <input
          type='password'
          placeholder={isEditing ? 'Nueva Contraseña' : 'Contraseña'}
          {...register('password')}
        />
        <select className='' {...register('modalidad')}>
          <option value="telefono">Telefono</option>
          <option value="rrss">RRSS</option>
        </select>
        <button className=''>
          {isEditing ? 'Guardar Cambios' : 'Registrar'}
        </button>
      </form>
    </>
  )
}
