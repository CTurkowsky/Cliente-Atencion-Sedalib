import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useAtencionStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
export const RegisterAtencionPage = () => {
  const [atencionCode, setAtencionCode] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const { activeAtencion } = useSelector((state) => state.atencion)
  const { register, handleSubmit, reset, setValue, watch } = useForm()
  const { startSavingAtencion, getAtencion } = useAtencionStore()
  const { user } = useSelector((state) => state.auth)
  const id_usuario = user.id_usuario
  const usedCodes = new Set()

  const { id } = useParams()
  const navigate = useNavigate()

  const categories = {
    AGUA: {
      subcategories: [
        'FUGA EN LA CAJA',
        'FUGA EN LA CAJA POR ROBO DE MEDIDOR',
        'FUGA EN VEREDA',
        'FUGA EN PISTA',
        'FUGA EN SARDINEL',
        'ROTURA EN RED MATRIZ',
        'MANTENIENTO DE VALVULA',
        'SONDEO EN TOMA',
        'SONDEO EN LA CAJA',
        'REPARACION DE CAJA DE REGISTRO DE AGUA',
        'MARCO Y TAPA EN CAJA DE AGUA'
      ],
      problems: [
        'FUGA EN CONEXIÓN DOMICILIARIA',
        'FUGA AGUA VEREDA CALZADA(2,3,4”)',
        'ADECUACION'
      ]
    },
    DESAGUE: {
      subcategories: [
        'TAPA DE BUZON',
        'ATORO EN CAJA',
        'ATORO EN COLECTOR',
        'MARCO Y TAPA DE CAJA DESAGUE',
        'REPARACION DE CAJA DE REGISTRO DE DESAGUE',
        'HUNDIMIENTO CENTRO DE LA PISTA (desagüe)',
        'REPARACION DE COLECTOR',
        'REPARACIONES DE CONEXION',
        'ROTURA DE TUBERIA DE DESAGUE'
      ],
      problems: [
        'BUZÓN ABIERTO MÁS DE 24 HORAS ALCANTARILLADO',
        'ATORO EN CONEXIÓN ALCANTARILLADO',
        'TAPONAMIENTO EN LA CONEXIÓN',
        'ADECUACION',
        'TAPONAMIENTO DE CONEXIÓN ZONA'
      ]
    },
    'SIN SERVICIO DE AGUA': {
      subcategories: [
        'FALTA DE AGUA (DE ALCANCE GENERAL)',
        'BAJA PRESION (DE ALCANCE GENERAL)',
        'FALTA DE AGUA (DE ALCANCE PARTICULAR)',
        'BAJA PRESION (DE ALCANCE PARTICULAR'
      ],
      problems: [
        'NO CUMPLIR CON EL HORARIO ABASTECIMIENTO INJUSTIFICADO',
        'FALTA DE AGUA O BAJA PRESIÓN EN CONEXIÓN DOMICILIARIA'
      ]
    },
    CONSULTAS: {
      subcategories: [
        'REQUISITOS',
        'CUENTA CORRIENTE',
        'CENTRO DE ATENCIÓN/HORARIOS',
        'REITERA/OTROS'
      ],
      problems: ['COMERCIAL']
    }
  }
  const category = watch('categoria')
  const subcategory = watch('sub_categoria')
  const modalidad = watch('modalidad')
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
      setValue('problema', atencionData.problema)
      setValue('numero_atencion', atencionData.numero_atencion)
      setValue('modalidad', atencionData.modalidad)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex align-center justify-center items-center'>
      <h2 className='text-2xl mb-4'>
        {' '}
        {isEditing ? 'Editar Atencion' : 'Registrar Atencion'}
      </h2>
      </div>
      <div className='flex flex-row flex-wrap sm:flex-nowrap gap-x-8 mt-8'>
        <div className='w-full sm:w-1/3 p-8  bg-white  rounded-lg shadow-lg animate__animated animate__fadeInUp'>
          <h2 className='text-xl font-semibold mb-4 text-center'>
            Datos de contacto
          </h2>
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

        <div className='w-full sm:w-1/3 p-8  bg-white  rounded-lg shadow-lg animate__animated animate__fadeInUp'>
          <h2 className='text-xl font-semibold mb-4 text-center'>
            Datos de registro
          </h2>
          <select
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            {...register('modalidad', { required: true })}
          >
            <option value='PRESENCIAL'>PRESENCIAL</option>
            <option value='TELEFONO'>TELEFONO</option>
            <option value='WEB'>WEB</option>
            <option value='WHATSAPP'>WHATSAPP</option>
            <option value='FACEBOOK'>FACEBOOK</option>
          </select>
          <label>Categoria</label>
          <select
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            {...register('categoria', { required: true })}
          >
            <option value=''>Seleccione una categoría</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {category && (
            <>
              <label>Sub-Categoria</label>
              <select
                className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                {...register('sub_categoria', { required: true })}
              >
                <option value=''>Seleccione una subcategoría</option>
                {categories[category].subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </>
          )}

          {subcategory && (
            <>
              <label>Problema</label>
              <select
                className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
                {...register('problema', { required: true })}
              >
                <option value=''>Seleccione un problema</option>
                {categories[category].problems.map((problem) => (
                  <option key={problem} value={problem}>
                    {problem}
                  </option>
                ))}
              </select>
            </>
          )}
          <textarea
            type='text'
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            placeholder='Petitorio'
            {...register('petitorio', { required: true })}
          />
          <div className='flex items-center'>
            <div className='relative flex-grow mr-4'>
              <input
                readOnly
                // value={atencionCode}
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
                className='block w-auto bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 rounded-l px-3 py-3 my-4 text-sm font-medium text-white'
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

        <div className='w-full sm:w-1/3 p-8  bg-white  rounded-lg shadow-lg animate__animated animate__fadeInUp'>
          <h2 className='text-xl font-semibold mb-4 text-center'>
            Datos de ubicacion
          </h2>
          <select
            className='w-full border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
            {...register('departamento', { required: true })}
          >
            <option>La Libertad</option>
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
    </form>
  )
}
