import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
export const exportToExcel = async (all) => {
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
