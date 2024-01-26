import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useUsuarioStore } from '../hooks'

export const UserTable = ({ usuarios }) => {
  const { user } = useSelector((state) => state.auth)
  const { startDeletingUsuario } = useUsuarioStore()
  return (
    <>
      <table className='items-center bg-transparent w-full border-collapse'>
        <thead className='bg-breaker-bay-300 text-white'>
          <tr>
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
              Nombre
            </th>
            <th
              scope='col'
              className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
            >
              Apellidos
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
              Modalidad
            </th>
            <th
              scope='col'
              className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {usuarios.map(
            ({ id_usuario, nombre, apellidos, email, modalidad }) => (
              <tr key={id_usuario} className='hover:bg-gray-100 transition-colors duration-200'>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'>
                  {id_usuario}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'>
                  {nombre}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'>
                  {apellidos}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'>
                  {email}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700'>
                  {modalidad}
                </td>

                {user.rol === 'admin'
                  ? (
                  <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                    <button className='middle none center rounded-lg bg-orange-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-4'>
                      <NavLink to={`/editar-usuario/${id_usuario}`}>
                        Editar
                      </NavLink>
                    </button>
                    <button
                      onClick={() => startDeletingUsuario(id_usuario)}
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
    </>
  )
}
