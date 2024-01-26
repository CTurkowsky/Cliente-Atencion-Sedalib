import { useUsuarioStore } from '../../hooks'
import { useEffect } from 'react'
import { UserTable } from '../../components'

export const UsuarioListPage = () => {
  const { usuarios, startLoadingUsuarios } =
    useUsuarioStore()
  useEffect(() => {
    startLoadingUsuarios()
  }, [])

  return (
    <div className='p-4'>
      <UserTable usuarios={usuarios} />
    </div>
  )
}
