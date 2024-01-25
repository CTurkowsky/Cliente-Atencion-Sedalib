import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useAtencionStore } from '../hooks'
export const Table = ({ atenciones }) => {
  const { user } = useSelector((state) => state.auth)
  const { startDeletingAtencion } = useAtencionStore()
  return (
    <div className='flex justify-center w-full'>
      <div style={{ overflowX: 'auto' }} className='w-1/2 h-1/2'>
        <table className='items-center bg-transparent w-full border-collapse'>
          <thead className='bg-breaker-bay-300 text-white'>
            <tr className=''>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                ID
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Numero Atencion
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Suministro
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Departamento
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Provincia
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Distrito
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Direccion
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Nombre Cliente
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Celular
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Email
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Documento Cliente
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Modalidad
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Categoria
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Sub Categoria
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Petitorio
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Fecha
              </th>
              <th
                scope='col'
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Usuario Registra
              </th>
              {user.rol === 'admin'
                ? (
                <th
                  scope='col'
                  className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
                >
                  Acciones
                </th>
                  )
                : null}
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
                doc_identidad,
                modalidad,
                categoria,
                sub_categoria,
                petitorio,
                numero_atencion,
                fecha,
                id_usuario
              }) => (
                <tr key={id_atencion}>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {id_atencion}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {numero_atencion}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {codigo_suministro}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {departamento}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {provincia}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {distrito}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {direccion}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {nombre_cliente}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {celular}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {email}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {doc_identidad}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {modalidad}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {categoria}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {sub_categoria}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {petitorio}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {fecha.slice(0, 10)}
                  </th>
                  <th
                    scope='row'
                    className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'
                  >
                    {id_usuario}
                  </th>
                  {user.rol === 'admin'
                    ? (
                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                      <button className='middle none center rounded-lg bg-orange-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-4'>
                        <NavLink to={`/editar/${id_atencion}`}>Editar</NavLink>
                      </button>
                      <button
                        onClick={() => startDeletingAtencion(id_atencion)}
                        className='middle none center mr-4 rounded-lg bg-red-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
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
      </div>
    </div>
  )
}
