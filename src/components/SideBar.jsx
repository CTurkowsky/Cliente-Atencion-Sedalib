import React, { useState } from 'react'
import { Home, Menu, Flag, User, LogOut } from 'react-feather'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuthStore } from '../hooks'
export const SideBar = ({ children }) => {
  const [asideOpen, setAsideOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { startLogout } = useAuthStore()
  return (
    <main className='h-screen w-full bg-gray-50 text-gray-700'>
      <header className='flex w-full items-center justify-between border-b-3 border-gray-200 text-white bg-breaker-bay-600 p-2'>
        <div className='flex items-center space-x-2'>
          <button
            type='button'
            className='text-3xl'
            onClick={() => setAsideOpen(!asideOpen)}
          >
            <Menu />
          </button>
          <div>
            <span className='font-medium'>Gestion de Atenciones - Dlaborum - </span>
            {user.nombre + ' ' + user.apellidos}
          </div>
        </div>
        <div>
          <button
            type='button'
            onClick={() => setProfileOpen(!profileOpen)}
            onBlur={() => setProfileOpen(false)}
            className='h-9 w-9 overflow-hidden rounded-full'
          ></button>
          <div
            className={`absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md ${
              profileOpen ? 'block' : 'hidden'
            }`}
          ></div>
        </div>
      </header>
      <div className='flex'>
        <aside
          className={`flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2  ${
            asideOpen ? 'block' : 'hidden'
          }`}
          style={{ height: '95.5vh' }}
        >
          <NavLink
            to='/'
            className='flex items-center space-x-2 rounded-md px-2 py-3 hover:bg-breaker-bay-100'
          >
            <span className='text-2xl'>
              <Home />
            </span>
            <span>Inicio</span>
          </NavLink>
          <div className='flex items-center space-x-2 rounded-md px-2 py-3 hover:bg-breaker-bay-100 cursor-pointer'>
            <span className='text-xl'>
              <Flag />
            </span>
            <details>
              <summary style={{ listStyle: 'none' }}>Atenciones</summary>
              <div className='flex flex-col space-y-2'>
                <NavLink to='/listar-atencion'>Listar</NavLink>
                <NavLink to='/registrar-atencion'>Registrar</NavLink>
              </div>
            </details>
          </div>
         {
          user.rol === 'admin'
            ? (<div className='flex items-center space-x-2 rounded-md px-2 py-3 hover:bg-breaker-bay-100 cursor-pointer'>
            <span className='text-2xl'>
              <User />
            </span>
            <details>
              <summary style={{ listStyle: 'none' }}>Usuarios</summary>
              <div className='flex flex-col space-y-2'>
                <NavLink to='/listar-usuarios'>Listar</NavLink>
                <NavLink to='/registrar-usuario'>Registrar</NavLink>
              </div>
            </details>
          </div>
              )
            : null
         }
          <button className='flex items-center space-x-2 rounded-md px-2 py-3 hover:bg-breaker-bay-100 cursor-pointer' onClick={startLogout}>
            <span className='text-2xl'>
              <LogOut />
            </span>
            <span>Cerrar Sesion</span>
          </button>
        </aside>
        <div className='w-full  p-4 overflow-auto overflow-y-auto'>{children}</div>
      </div>
    </main>
  )
}
