import { createSlice } from '@reduxjs/toolkit'

export const atencionSlice = createSlice({
  name: 'atencion',
  initialState: {
    isLoadingAtenciones: true,
    atenciones: [],
    all: [],
    activeAtencion: null
  },
  reducers: {
    onSetActiveAtencion: (state, { payload }) => {
      state.activeAtencion = payload
    },
    onAddNewAtencion: (state, { payload }) => {
      state.atenciones.push(payload)
    },
    onUpdateAtencion: (state, { payload }) => {
      state.atenciones = state.atenciones.map((atencion) => {
        if (atencion.id_atencion === payload.id_atencion) {
          return payload
        }
        return atencion
      })
    },
    onDeleteAtencion: (state, { payload }) => {
      state.atenciones = state.atenciones.filter(
        (atencion) => atencion.id_atencion !== payload
      )
    },
    onLoadAtenciones: (state, { payload = [] }) => {
      state.isLoadingAtenciones = false
      state.atenciones = payload
    },
    onLoadAllAtenciones: (state, { payload = [] }) => {
      state.all = payload
    },
    clearState: (state) => {
      state.isLoadingAtenciones = true
      state.atenciones = []
      state.all = []
    }
  }
})

export const {
  onAddNewAtencion,
  onDeleteAtencion,
  onLoadAtenciones,
  onLoadAllAtenciones,
  clearState,
  onSetActiveAtencion,
  onUpdateAtencion
} = atencionSlice.actions
