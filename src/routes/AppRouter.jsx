import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { AtencionRoutes } from '../atencion/routes/AtencionRoutes'
import { useEffect } from 'react'
import { useAuthStore } from '../hooks/useAuthStore'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <h1>Checking...</h1>
  }
  return (

    <Routes>
      {status === 'authenticated'
        ? (
          <Route path='/*' element={<AtencionRoutes />} />
          )
        : (
          <>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>
          )}
    </Routes>

  )
}
