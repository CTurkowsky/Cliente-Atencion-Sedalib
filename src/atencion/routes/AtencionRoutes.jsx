import { Navigate, Route, Routes } from 'react-router-dom'
import { AtencionListPage, RegisterAtencionPage, RegisterUsuarioPage, UsuarioListPage } from '../pages'
import { Home } from '../Home'
import { SideBar } from '../../components/SideBar'
import { useSelector } from 'react-redux'

export const AtencionRoutes = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <SideBar>
      <Routes>
        <Route path="/registrar" element={<RegisterAtencionPage />} />
        <Route path="/registrarusuario" element={user && user.rol === 'admin' ? <RegisterUsuarioPage/> : <Navigate to='/' />} />
        <Route path="/editar/:id" element={<RegisterAtencionPage />} />
        <Route path="/editarusuario/:id" element={<RegisterUsuarioPage/>} />
        <Route path="/listar" element={user && user.rol === 'admin' ? <AtencionListPage/> : <Navigate to='/' />} />
        <Route path="/listarusuarios" element={user && user.rol === 'admin' ? <UsuarioListPage/> : <Navigate to='/' />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to='/'/>}/>
      </Routes>
     </SideBar>
  )
}
