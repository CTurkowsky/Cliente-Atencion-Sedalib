import { Navigate, Route, Routes } from 'react-router-dom'
import { AtencionListPage, HomePage, RegisterAtencionPage, RegisterUsuarioPage, UsuarioListPage } from '../pages'
import { useSelector } from 'react-redux'
import { SideBar } from '../../components'
export const AtencionRoutes = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <SideBar>
      <Routes>
        <Route path="/registrar-atencion" element={<RegisterAtencionPage />} />
        <Route path="/registrar-usuario" element={user && user.rol === 'admin' ? <RegisterUsuarioPage/> : <Navigate to='/' />} />
        <Route path="/editar-atencion/:id" element={<RegisterAtencionPage />} />
        <Route path="/editar-usuario/:id" element={<RegisterUsuarioPage/>} />
        <Route path="/listar-atenciones" element={ <AtencionListPage/>} />
        <Route path="/listar-usuarios" element={user && user.rol === 'admin' ? <UsuarioListPage/> : <Navigate to='/' />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Navigate to='/'/>}/>
      </Routes>
     </SideBar>
  )
}
