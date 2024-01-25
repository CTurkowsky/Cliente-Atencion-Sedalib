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
        reset()
        navigate('/listar')
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap justify-center -mx-2'>
            <div className='w-full md:w-1/2 px-2 mb-4'>
              <div className='p-4 border rounded'>
                <input
                  type='text'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Codigo de suministro'
                  {...register('codigo_suministro', { required: true })}
                />

                <input
                  type='text'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Nombre del usuario'
                  {...register('nombre_cliente', { required: true })}
                />
                <input
                  type='text'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Documento de Identidad'
                  {...register('doc_identidad', { required: true })}
                />
                <input
                  type='tel'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Celular'
                  {...register('celular', { required: true })}
                />

                <input
                  type='email'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Correo'
                  {...register('email')}
                />
              </div>
            </div>
            <div className='w-full md:w-1/2 px-2 mb-4'>
              <div className='p-4 border rounded'>
                <select
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  {...register('departamento', { required: true })}
                >
                  <option>La Libertad</option>
                  <option>Otro departamento</option>
                </select>

                <select
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  {...register('provincia', { required: true })}
                >
                  <option>Trujillo</option>
                </select>

                <select
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
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
                <input
                  type='text'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Direccion del suministro'
                  {...register('direccion', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full px-2 mb-4'>
              <div className='p-4 border rounded'>
                <label>Categoria</label>
                <select
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  {...register('categoria', { required: true })}
                >
                  <option>Consultas-otros</option>
                  <option>Operacionales</option>
                  <option>Comerciales no relacionados</option>
                  <option>Actividades complementarias</option>
                </select>
                <label>Sub-Categoria</label>
                <select
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
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
                        <label>Problema</label>
                <input
                  type='text'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  {...register('problema', { required: true })}
                />
                <textarea
                  type='text'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  placeholder='Petitorio'
                  {...register('petitorio', { required: true })}
                />
                <div className='flex'>
                  <div className='relative flex-grow'>
                    <input
                      readOnly
                      value={atencionCode}
                      type='text'
                      className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
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
                <label>Fecha</label>
                <input
                  readOnly={!isEditing}
                  type='date'
                  className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                  value={localDate.toISOString().slice(0, 10)}
                  placeholder='Fecha'
                  {...register('fecha', { required: true })}
                />
                <button className='block w-full bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 rounded-l px-5 py-3 my-4 text-sm font-medium text-white'>
                  {isEditing ? 'Guardar Cambios' : 'Registrar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
