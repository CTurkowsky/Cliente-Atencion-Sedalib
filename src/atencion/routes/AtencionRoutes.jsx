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
        <Route path="/registrar-atencion" element={<RegisterAtencionPage />} />
        <Route path="/registrar-usuario" element={user && user.rol === 'admin' ? <RegisterUsuarioPage/> : <Navigate to='/' />} />
        <Route path="/editar/:id" element={<RegisterAtencionPage />} />
        <Route path="/editar-usuario/:id" element={<RegisterUsuarioPage/>} />
        <Route path="/listar-atencion" element={ <AtencionListPage/>} />
        <Route path="/listar-usuarios" element={user && user.rol === 'admin' ? <UsuarioListPage/> : <Navigate to='/' />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to='/'/>}/>
      </Routes>
     </SideBar>
  )
}
