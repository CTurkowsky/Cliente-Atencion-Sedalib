import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewAtencion,
  onDeleteAtencion,
  onLoadAtenciones,
  onLoadAllAtenciones,
  onSetActiveAtencion,
  onUpdateAtencion,
  clearState
} from '../store'
import { atencionApi } from '../api'
import { useState } from 'react'
export const useAtencionStore = () => {
  const dispatch = useDispatch()
  const { atenciones } = useSelector((state) => state.atencion)
  const { all } = useSelector((state) => state.atencion)
  const [hasMore, setHasMore] = useState(true)

  const setActiveAtencion = (atencion) => {
    dispatch(onSetActiveAtencion(atencion))
  }

  const startSavingAtencion = async (atencion) => {
    try {
      if (atencion.id_atencion) {
        await atencionApi.put(`atenciones/${atencion.id_atencion}`, atencion)
        dispatch(onUpdateAtencion({ ...atencion }))
        dispatch(onSetActiveAtencion(null))
        return
      }
      const { data } = await atencionApi.post('/atenciones', atencion)
      dispatch(
        onAddNewAtencion({
          ...atencion,
          id_atencion: data.atencion.id_atencion
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  const startDeletingAtencion = async (id) => {
    try {
      await atencionApi.delete(`/atenciones/${id}`)
      dispatch(onDeleteAtencion(id))
    } catch (error) {
      console.log(error)
    }
  }

  const startLoadingAtenciones = async (
    page = 1,
    pageSize = 2,
    fromDate,
    toDate
  ) => {
    try {
      const { data } = await atencionApi.get('/atenciones', {
        params: {
          page,
          pageSize,
          fromDate,
          toDate
        }
      })
      const atenciones = data.atenciones
      const hasMore = data.hasMore

      // Carga las atenciones antes de verificar si hay más
      dispatch(onLoadAtenciones(atenciones))
      setHasMore(hasMore)

      return hasMore // Devuelve el valor de hasMore directamente
    } catch (error) {
      console.log('Error cargando atenciones')
      console.log(error)
      setHasMore(false) // Ocurrió un error, asumimos que no hay más datos
      return false
    }
  }
  const resetHasMore = () => {
    setHasMore(true)
  }
  const startLoadingAllAtenciones = async (fromDate, toDate) => {
    try {
      const { data } = await atencionApi.get('/atenciones', {
        params: {
          fromDate,
          toDate
        }
      })
      const all = data.atenciones
      dispatch(onLoadAllAtenciones(all))
      return all // Despacha la acción loadAtenciones con las nuevas atenciones cargadas
    } catch (error) {
      console.log('Error cargando atenciones')
      console.log(error)
    }
  }

  const getAtencion = async (idAtencion) => {
    try {
      const { data } = await atencionApi.get(`/atenciones/${idAtencion}`)
      const atencion = data.atencion
      return atencion
    } catch (error) {
      console.log(error)
    }
  }
  const clearAtenciones = () => {
    dispatch(clearState())
  }
  return {
    //* Propiedades
    atenciones,
    all,
    hasMore,
    //* Metodos
    clearAtenciones,
    setActiveAtencion,
    startDeletingAtencion,
    startLoadingAtenciones,
    getAtencion,
    startLoadingAllAtenciones,
    startSavingAtencion,
    resetHasMore
  }
}
