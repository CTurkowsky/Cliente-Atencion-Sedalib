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
   <UserTable usuarios={usuarios} />
  )
}
