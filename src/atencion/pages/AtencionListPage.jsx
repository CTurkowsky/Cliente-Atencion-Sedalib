// TODO: Arreglar   carga de todos los registros
import { useEffect, useState } from 'react'
import { useAtencionStore } from '../../hooks'
import { useForm } from 'react-hook-form'
import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import { Table } from '../../components'
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
    startLoadingAtenciones,
    startLoadingAllAtenciones,
    clearAtenciones
  } = useAtencionStore()
  const [allAtenciones, setAllAtenciones] = useState([])
  const [previousPage, setPreviousPage] = useState(1)
  const [totalViewing, setTotalViewing] = useState(0)

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

  const getAllAtenciones = async (fromDate, toDate) => {
    try {
      const allAtenciones = await startLoadingAllAtenciones(fromDate, toDate)
      setAllAtenciones(allAtenciones)
    } catch (error) {
      console.log(error)
    }
  }
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
      { header: 'Modalidad', key: 'modalidad' },
      { header: 'Categoria', key: 'categoria' },
      { header: 'Sub Categoria', key: 'sub_categoria' },
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
    allAtenciones.forEach((atencion) => {
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
  const onSubmit = ({ fecha_inicio, fecha_fin }) => {
    // Si fecha_inicio o fecha_fin no están definidos, retorna temprano
    if (!fecha_inicio || !fecha_fin) {
      console.error('fecha_inicio y fecha_fin deben estar definidos')
      return
    }

    // Comprueba si fecha_inicio y fecha_fin son fechas válidas
    if (isNaN(new Date(fecha_inicio)) || isNaN(new Date(fecha_fin))) {
      console.error('fecha_inicio o fecha_fin no son fechas válidas')
      return
    }

    // Ajusta la fecha de inicio a la medianoche en la zona horaria UTC
    const startDate = new Date(`${fecha_inicio}T00:00:00.000Z`)

    // Ajusta la fecha de finalización al final del día en la zona horaria UTC
    const endDate = new Date(`${fecha_fin}T23:59:59.999Z`)

    // Convierte las fechas a cadenas en la zona horaria UTC
    const fromDate = startDate.toISOString()
    const toDate = endDate.toISOString()

    setFromDate(fromDate)
    setToDate(toDate)

    startLoadingAtenciones(1, 2, fromDate, toDate)
    getAllAtenciones(fromDate, toDate)
    // Resetea los valores del formulario
    if (hasMore) {
      reset()
    }
  }
  return (
    <>
      <h2>AtencionListPage</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='date'
          placeholder='fecha_inicio'
          {...register('fecha_inicio')}
        />
        <input type='date' placeholder='fecha_fin' {...register('fecha_fin')} />
        <button>Buscar</button>
      </form>
      <button onClick={clearAtenciones}>Limpiar</button>
      {atenciones?.length === 0
        ? (
        <div className=''>Selecciona un filtro de busqueda!</div>
          )
        : (
        <>
          <button onClick={exportToExcel}>Exportar a Excel</button>
          <Table atenciones={atenciones} />
          <p>
            Estas viendo {totalViewing} registros de {allAtenciones.length}
          </p>
        </>
          )}
      <>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button onClick={() => changePage(currentPage + 1)} disabled={!hasMore}>
          Siguiente
        </button>
      </>
    </>
  )
}
