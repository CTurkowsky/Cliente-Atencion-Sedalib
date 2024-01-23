import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../hooks'
export const SideBar = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const { startLogout } = useAuthStore()
  return (
    <div className=''>
      <div className=''>
        <nav className=''>
          <div className=''>
            <div className=''></div>
            <ul className=''>
              <h2 className=''>Sistema de Atencion</h2>
              <div className=''>
                <h2 className=''>{user.nombre}</h2>
                <NavLink className='' to='/auth/login' onClick={startLogout}>
                  Cerrar Sesion
                </NavLink>
              </div>

              <li className=''>
                <NavLink className='' to='/'>
                  Inicio
                </NavLink>
              </li>
              <li className=''>
                <a className=''>Atencion</a>
                <ul className=''>
                  <li>
                    <NavLink className='' to='/registrar'>
                      Registrar Atencion
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='' to='/listar'>
                      Listar Atencion
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className=''>
                <a className=''>Usuarios</a>
                <ul className=''>
                  <li>
                    <NavLink className='' to='/registrarusuario'>
                      Registrar Usuario
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='' to='/listarusuarios'>
                      Listar Usuario
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <main className=''>{children}</main>
      </div>
    </div>
  )
}
