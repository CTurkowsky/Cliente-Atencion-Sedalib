import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useAtencionStore } from '../hooks'
export const Table = ({ atenciones }) => {
  const { user } = useSelector((state) => state.auth)
  const { startDeletingAtencion } = useAtencionStore()
  return (
    <>
      <table className=''>
        <thead>
          <tr className=''>
            <th scope=''>ID</th>
            <th scope=''>Numero Atencion</th>
            <th scope=''>Suministro</th>
            <th scope=''>Departamento</th>
            <th scope=''>Provincia</th>
            <th scope=''>Distrito</th>
            <th scope=''>Direccion</th>
            <th scope=''>Nombre Cliente</th>
            <th scope=''>Celular</th>
            <th scope=''>Email</th>
            <th scope=''>Modalidad</th>
            <th scope=''>Categoria</th>
            <th scope=''>Sub Categoria</th>
            <th scope=''>Petitorio</th>
            <th scope=''>Fecha</th>
            <th scope=''>Usuario Registra</th>
            <th scope=''>Acciones</th>
          </tr>
        </thead>
        <tbody className=''>
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
                <th scope='row'>{id_atencion}</th>
                <th scope='row'>{numero_atencion}</th>
                <th scope='row'>{codigo_suministro}</th>
                <th scope='row'>{departamento}</th>
                <th scope='row'>{provincia}</th>
                <th scope='row'>{distrito}</th>
                <th scope='row'>{direccion}</th>
                <th scope='row'>{nombre_cliente}</th>
                <th scope='row'>{celular}</th>
                <th scope='row'>{email}</th>
                <th scope='row'>{modalidad}</th>
                <th scope='row'>{categoria}</th>
                <th scope='row'>{sub_categoria}</th>
                <th scope='row'>{petitorio}</th>
                <th scope='row'>{fecha.slice(0, 10)}</th>
                <th scope='row'>{id_usuario}</th>
                {user.rol === 'admin'
                  ? (
                  <td>
                    <button>
                      <NavLink to={`/editar/${id_atencion}`}>Editar</NavLink>
                    </button>
                    <button onClick={() => startDeletingAtencion(id_atencion)}>
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
