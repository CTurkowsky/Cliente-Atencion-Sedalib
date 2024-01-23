import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useAtencionStore } from '../hooks'
export const Table = ({ atenciones }) => {
  const { user } = useSelector((state) => state.auth)
  const { startDeletingAtencion } = useAtencionStore()
  return (
    <>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-breaker-bay-500 text-white'>
          <tr className=''>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              ID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Numero Atencion
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Suministro
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Departamento
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Provincia
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Distrito
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Direccion
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Nombre Cliente
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Celular
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Email
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Modalidad
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Categoria
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Sub Categoria
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Petitorio
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Fecha
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Usuario Registra
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {atenciones.map(
            ({
              id_atencion,
              codigo_suministro,
              departamento,
              provincia,
              distrito,
              direccion,
              nombre_cliente,
              celular,
              email,
              modalidad,
              categoria,
              sub_categoria,
              petitorio,
              numero_atencion,
              fecha,
              id_usuario
            }) => (
              <tr key={id_atencion}>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {id_atencion}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {numero_atencion}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {codigo_suministro}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {departamento}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {provincia}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {distrito}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {direccion}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {nombre_cliente}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {celular}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {email}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {modalidad}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {categoria}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {sub_categoria}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {petitorio}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {fecha.slice(0, 10)}
                </th>
                <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                  {id_usuario}
                </th>
                {user.rol === 'admin'
                  ? (
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded'>
                      <NavLink to={`/editar/${id_atencion}`}>Editar</NavLink>
                    </button>
                    <button
                      onClick={() => startDeletingAtencion(id_atencion)}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                      Eliminar
                    </button>
                  </td>
                    )
                  : null}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  )
}
