import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useAtencionStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
export const RegisterAtencionPage = () => {
  const [atencionCode, setAtencionCode] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const { activeAtencion } = useSelector((state) => state.atencion)
  const { register, handleSubmit, reset, setValue } = useForm()
  const { startSavingAtencion, getAtencion } = useAtencionStore()
  const { user } = useSelector((state) => state.auth)
  const id_usuario = user.id_usuario
  const modalidad = user.modalidad
  const usedCodes = new Set()

  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAtencion = async () => {
      const atencionData = await getAtencion(id)
      for (const field in atencionData) {
        if (field === 'fecha') {
          setValue(
            field,
            new Date(atencionData[field]).toISOString().slice(0, 10)
          )
        } else {
          setValue(field, atencionData[field])
        }
      }

      // Establecer el valor de los campos select
      setValue('departamento', atencionData.departamento)
      setValue('provincia', atencionData.provincia)
      setValue('distrito', atencionData.distrito)
      setValue('categoria', atencionData.categoria)
      setValue('sub_categoria', atencionData.sub_categoria)
    }

    if (id) {
      setIsEditing(true)
      fetchAtencion()
    } else {
      setIsEditing(false)
    }
  }, [id, getAtencion, setValue])

  const generateAtencion = (event) => {
    event.preventDefault()
    let code
    do {
      const randomNumber = Math.floor(Math.random() * 9000000) + 1000000
      code = '5017' + randomNumber.toString()
    } while (usedCodes.has(code))

    usedCodes.add(code)
    setAtencionCode(code)
  }

  useEffect(() => {
    setValue('numero_atencion', atencionCode)
  }, [atencionCode, setValue])

  const date = new Date()
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      id_usuario,
      modalidad
    }

    try {
      if (isEditing) {
        await startSavingAtencion({ activeAtencion, ...newData })
        navigate('/listar')
        reset()
      } else {
        console.log(newData)
        await startSavingAtencion(newData)
        reset()
        navigate('/listar')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-lg'>
          <h1 className='text-center text-2xl sm:text-3xl'>Atencion Sedalib</h1>
          <form className='' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='relative'>
                <label>Codigo Suministro</label>
                <input
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='xxxxxxxxxx'
                  {...register('codigo_suministro', { required: true })}
                />
              </div>
            </div>
            <div>
              <div className=''>
                <input
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Nombre del usuario'
                  {...register('nombre_cliente', { required: true })}
                />
              </div>
            </div>
            <div>
              <div className=''>
                <input
                  type='tel'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Celular'
                  {...register('celular', { required: true })}
                />
              </div>
            </div>
            <div>
              <div className=''>
                <input
                  type='email'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Correo'
                  {...register('email')}
                />
              </div>
            </div>
            <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <label>Departamento</label>
              <select
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                {...register('departamento', { required: true })}
              >
                <option>La Libertad</option>
                <option>Otro departamento</option>
              </select>
            </div>

            <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <label>Provincia</label>
              <select
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                {...register('provincia', { required: true })}
              >
                <option>Trujillo</option>
              </select>
            </div>

            <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <label>Distrito</label>
              <select
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                {...register('distrito', { required: true })}
              >
                <option>El Porvenir</option>
                <option>Florencia de Mora</option>
                <option>Huanchaco</option>
                <option>La Esperanza</option>
                <option>Laredo</option>
                <option>Moche</option>
                <option>Poroto</option>
                <option>Salaverry</option>
                <option>Simbal</option>
                <option>Trujillo</option>
                <option>Victor Larco Herrera</option>
              </select>
            </div>
            <div>
              <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
                <input
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Direccion del suministro'
                  {...register('direccion', { required: true })}
                />
              </div>
            </div>

            <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <label>Categoria</label>
              <select
                className=''
                {...register('categoria', { required: true })}
              >
                <option>Consultas-otros</option>
                <option>Operacionales</option>
                <option>Comerciales no relacionados</option>
                <option>Actividades complementarias</option>
              </select>
            </div>
            <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <label>Sub-Categoria</label>
              <select
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                {...register('sub_categoria', { required: true })}
              >
                <option>Problema en servicio agua potable</option>
                <option>Filtraciones</option>
                <option>Actividades comerciales</option>
                <option>Cortes del servicio</option>
                <option>Falta de entrega de recibos</option>
                <option>Atoro en la conexion de alcantaril</option>
                <option>Fugas en red ag. pot. e inundacion</option>
              </select>
            </div>
            <div>
              <div className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
                <textarea
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Petitorio'
                  {...register('petitorio', { required: true })}
                />
              </div>
            </div>
            <div className='flex'>
              <div className='relative flex-grow'>
                <input
                  readOnly
                  value={atencionCode}
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Numero de Atencion'
                  {...register('numero_atencion', { required: true })}
                />
              </div>
              {!isEditing && (
                <button
                  type='submit'
                  onClick={generateAtencion}
                  className='block rounded-l px-5 py-3 text-sm font-medium bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 text-white'
                >
                  Generar Atencion
                </button>
              )}
            </div>
            <div>
              <div className=''>
                <label>Fecha</label>
                <input
                  readOnly={!isEditing}
                  type='date'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  value={localDate.toISOString().slice(0, 10)}
                  placeholder='Fecha'
                  {...register('fecha', { required: true })}
                />
              </div>
            </div>
            <button className='block w-full bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 rounded-l px-5 py-3 my-4 text-sm font-medium text-white'>
              {isEditing ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
