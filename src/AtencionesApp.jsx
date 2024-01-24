import { AppRouter } from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AtencionesApp = () => {
  return (
    <>
    <AppRouter/>
    <ToastContainer />
    </>
  )
}
