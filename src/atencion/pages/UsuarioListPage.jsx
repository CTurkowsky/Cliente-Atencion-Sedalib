import { NavLink } from 'react-router-dom'
import { useUsuarioStore } from '../../hooks'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const UsuarioListPage = () => {
  const { usuarios, startLoadingUsuarios, startDeletingUsuario } = useUsuarioStore()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    startLoadingUsuarios()
  }, [])

  return (
    <>
      <table className=''>
        <thead>
          <tr className=''>
            <th scope=''>ID</th>
            <th scope=''>Nombre</th>
            <th scope=''>Apellidos</th>
            <th scope=''>Email</th>
            <th scope=''>Modalidad</th>
            <th scope=''>Acciones</th>
          </tr>
        </thead>
        <tbody className=''>
          {usuarios.map(
            ({ id_usuario, nombre, apellidos, email, modalidad }) => (
              <tr key={id_usuario}>
                <th scope='row'>{id_usuario}</th>
                <th scope='row'>{nombre}</th>
                <th scope='row'>{apellidos}</th>
                <th scope='row'>{email}</th>
                <th scope='row'>{modalidad}</th>

                {user.rol === 'admin'
                  ? (
                  <td>
                    <button>
                      <NavLink to={`/editarusuario/${id_usuario}`}>Editar</NavLink>
                    </button>
                    <button onClick={() => startDeletingUsuario(id_usuario)}>
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
