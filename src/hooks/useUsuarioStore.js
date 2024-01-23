import { useDispatch, useSelector } from 'react-redux'
import { onAddNewUsuario, onDeleteUsuario, onLoadUsuarios, onSetActiveUsuario, onUpdateUsuario } from '../store'
import { atencionApi } from '../api'

export const useUsuarioStore = () => {
  const dispatch = useDispatch()
  const { usuarios } = useSelector((state) => state.usuario)

  const setActiveUsuario = (usuario) => {
    dispatch(onSetActiveUsuario(usuario))
  }

  const startSavingUsuario = async (usuario) => {
    try {
      if (usuario.id_usuario) {
        await atencionApi.put(`usuarios/${usuario.id_usuario}`, usuario)
        dispatch(onUpdateUsuario({ ...usuario }))
        dispatch(onSetActiveUsuario(null))
        return
      }
      const { data } = await atencionApi.post('/usuarios', usuario)
      dispatch(onAddNewUsuario({ ...usuario, id_usuario: data.usuario.id_usuario }))
    } catch (error) {
      console.log(error)
    }
  }
  const startDeletingUsuario = async (id) => {
    try {
      await atencionApi.delete(`/usuarios/${id}`)
      dispatch(onDeleteUsuario(id))
    } catch (error) {
      console.log(error)
    }
  }

  const startLoadingUsuarios = async () => {
    try {
      const { data } = await atencionApi.get('/usuarios')
      const usuarios = (data.usuarios)
      dispatch(onLoadUsuarios(usuarios))
    } catch (error) {
      console.log('Error cargando usuarios')
      console.log(error)
    }
  }
  const getUsuario = async (idUsuario) => {
    try {
      const { data } = await atencionApi.get(`/usuarios/${idUsuario}`)
      const usuario = data.usuario
      return usuario
    } catch (error) {
      console.log(error)
    }
  }
  return {
    //* Propiedades
    usuarios,
    //* Metodos
    setActiveUsuario,
    startDeletingUsuario,
    startLoadingUsuarios,
    startSavingUsuario,
    getUsuario

  }
}
