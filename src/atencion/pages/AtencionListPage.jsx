import { useEffect, useState } from 'react'
import { useAtencionStore } from '../../hooks'
import { useForm } from 'react-hook-form'
import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import { Table } from '../../components'
import { toast } from 'react-toastify'
export const AtencionListPage = () => {
  // Variables relacionadas con el estado del componente
  const [currentPage, setCurrentPage] = useState(1)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)

  // Variables relacionadas con el manejo de formularios
  const { register, handleSubmit, reset } = useForm()
  // Variables relacionadas con el manejo de atenciones
  const {
    atenciones,
    hasMore,
    all,
    startLoadingAtenciones,
    startLoadingAllAtenciones,
    clearAtenciones
  } = useAtencionStore()
  const [previousPage, setPreviousPage] = useState(1)
  const [totalViewing, setTotalViewing] = useState(0)
  useEffect(() => {
    return () => {
      // Código que se ejecuta cuando el componente se desmonta
      clearAtenciones()
    }
  }, [])
  useEffect(() => {
    // Cuando la página cambia, actualiza totalViewing
    if (currentPage === 1) {
      setTotalViewing(atenciones?.length || 0)
    } else if (currentPage > previousPage) {
      setTotalViewing(totalViewing + (atenciones?.length || 0))
    } else if (currentPage < previousPage) {
      setTotalViewing(totalViewing - (atenciones?.length || 0))
    }

    // Actualiza previousPage para la próxima vez que currentPage cambie
    setPreviousPage(currentPage)
  }, [currentPage, atenciones?.length])

  const changePage = async (newPage) => {
    // Si la nueva página es menor que 0, no hagas nada
    if (newPage < 0) return

    // Carga los datos de la nueva página y espera a que termine
    await startLoadingAtenciones(newPage, 2, fromDate, toDate)

    // Si estás avanzando a la siguiente página y no hay más datos, no permitir avanzar
    if (newPage > currentPage && !hasMore) {
      return
    }

    // Cambia la página después de verificar si hay más datos
    setCurrentPage(newPage)
  }
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Atenciones')

    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    // Define las columnas del archivo de Excel
    worksheet.columns = [
      { header: 'ID', key: 'id_atencion' },
      { header: 'Numero Atencion', key: 'numero_atencion' },
      { header: 'Suministro', key: 'codigo_suministro' },
      { header: 'Departamento', key: 'departamento' },
      { header: 'Provincia', key: 'provincia' },
      { header: 'Distrito', key: 'distrito' },
      { header: 'Direccion', key: 'direccion' },
      { header: 'Nombre Cliente', key: 'nombre_cliente' },
      { header: 'Celular', key: 'celular' },
      { header: 'Email', key: 'email' },
      { header: 'Doc Identidad', key: 'doc_identidad' },
      { header: 'Modalidad', key: 'modalidad' },
      { header: 'Categoria', key: 'categoria' },
      { header: 'Sub Categoria', key: 'sub_categoria' },
      { header: 'Problema', key: 'problema' },
      { header: 'Petitorio', key: 'petitorio' },
      { header: 'Fecha', key: 'fecha' },
      { header: 'Usuario Registra', key: 'id_usuario' },
      { header: 'Fecha Creacion', key: 'createdAt' },
      { header: 'Fecha Modificacion', key: 'updatedAt' }
    ]
    const headerRow = worksheet.getRow(1)
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '92cddc' }
      }

      // Aplica el estilo de borde a las celdas de la cabecera
      cell.border = borderStyle

      // Centra el contenido de las celdas de la cabecera
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
    })

    // Agrega los datos a la hoja de trabajo
    all.forEach((atencion) => {
      const row = worksheet.addRow(atencion)

      // Aplica el estilo de borde y el alineamiento a todas las celdas
      row.eachCell((cell) => {
        cell.border = borderStyle
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      })
    })

    // Ajusta el ancho de las columnas según el contenido
    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 20 ? 20 : column.header.length
    })

    // Obtiene el buffer del archivo de Excel
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    saveAs(blob, 'atenciones.xlsx')
  }
  const onSubmit = ({
    fecha_inicio,
    fecha_fin,
    codigo_suministro,
    numero_atencion
  }) => {
    let fromDate, toDate

    // Solo ajusta las fechas y las convierte a cadenas si están definidas
    if (fecha_inicio && fecha_fin) {
      // Ajusta la fecha de inicio a la medianoche en la zona horaria UTC
      const startDate = new Date(`${fecha_inicio}T00:00:00.000Z`)

      // Ajusta la fecha de finalización al final del día en la zona horaria UTC
      const endDate = new Date(`${fecha_fin}T23:59:59.999Z`)

      // Convierte las fechas a cadenas en la zona horaria UTC
      fromDate = startDate.toISOString()
      toDate = endDate.toISOString()

      setFromDate(fromDate)
      setToDate(toDate)
    }

    const codigoSuministro = codigo_suministro
    const numeroAtencion = numero_atencion

    if (!fromDate && !toDate && !codigoSuministro && !numeroAtencion) {
      // Si todos los campos están vacíos, muestra un toast y termina la ejecución de la función
      toast.info('Seleciona un filtro de busqueda!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
    }
    startLoadingAtenciones(
      1,
      50,
      fromDate,
      toDate,
      codigoSuministro,
      numeroAtencion
    )
    startLoadingAllAtenciones(
      fromDate,
      toDate,
      codigoSuministro,
      numeroAtencion
    )

    if (hasMore) {
      reset()
    }
  }
  return (
    <>
      <div className='flex justify-center items-center text-gray-700'>
        <h2 className='text-2xl mb-4'>Lista de Atenciones</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row items-center justify-center space-x-4'>
          <input
            type='date'
            placeholder='fecha_inicio'
            {...register('fecha_inicio')}
            className='w-1/4 border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
          />
          <input
            type='date'
            placeholder='fecha_fin'
            {...register('fecha_fin')}
            className='w-1/4 border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
          />
          <input
            type='number'
            placeholder='Codigo Suministro'
            {...register('codigo_suministro')}
            className='w-1/4 border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
          />
          <input
            type='number'
            placeholder='Numero de Atencion'
            {...register('numero_atencion')}
            className='w-1/4 border rounded-lg text-gray-700 p-4 my-4 pe-12 text-sm shadow-sm'
          />
          <button className='bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 text-white middle none center mr-4 rounded-lg py-2 px-6 font-sans text-xs font-bold uppercase'>
            Buscar
          </button>
          <button
          type='button'
            className='bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 text-white middle none center mr-4 rounded-lg py-2 px-6 font-sans text-xs font-bold uppercase'
            onClick={() => reset()}
          >
            Limpiar
          </button>
        </div>
      </form>

      {atenciones?.length === 0
        ? null
        : (
        <>
          <div className='flex justify-center items-center my-8 mx-auto'>
            <button
              onClick={exportToExcel}
              className='middle none center mr-4 rounded-lg bg-green-500 py-2 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            >
              Exportar a Excel
            </button>
          </div>
          <div
            className='flex justify-center items-center  bg-blue-100 rounded-lg p-2 mb-8 text-sm text-blue-700 w-1/3 mx-auto'
            role='alert'
          >
            <svg
              className='w-4 h-4 inline mr-2'
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
            <div>
              Estas viendo <span className='font-medium'>{totalViewing}</span>{' '}
              registros de <span className='font-medium'>{all.length}</span>
            </div>
          </div>
          <Table atenciones={atenciones} />
          <div className='flex justify-center items-center my-8'>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className='bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 text-white middle none center mr-4 rounded-lg py-2 px-6 font-sans text-xs font-bold uppercase'
            >
              Anterior
            </button>
            <span className='mr-4'>
              Página <span className='font-medium'>{currentPage}</span>
            </span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={!hasMore}
              className='bg-breaker-bay-500 hover:bg-breaker-bay-600 active:bg-breaker-bay-700 text-white middle none center mr-4 rounded-lg py-2 px-6 font-sans text-xs font-bold uppercase'
            >
              Siguiente
            </button>
          </div>
        </>
          )}
    </>
  )
}
