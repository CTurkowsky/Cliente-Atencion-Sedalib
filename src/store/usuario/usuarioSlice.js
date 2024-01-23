import { createSlice } from '@reduxjs/toolkit'

export const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: {
    isLoadingUsuarios: true,
    usuarios: [],
    activeUsuario: null
  },
  reducers: {
    onSetActiveUsuario: (state, { payload }) => {
      state.activeUsuario = payload
    },
    onAddNewUsuario: (state, { payload }) => {
      state.usuarios.push(payload)
    },
    onUpdateUsuario: (state, { payload }) => {
      state.usuarios = state.usuarios.map((usuario) => {
        if (usuario.id_usuario === payload.id_usuario) {
          return payload
        }
        return usuario
      })
    },
    onDeleteUsuario: (state, { payload }) => {
      state.usuarios = state.usuarios.filter(
        (usuario) => usuario.id_usuario !== payload
      )
    },
    onLoadUsuarios: (state, { payload = [] }) => {
      state.isLoadingAtenciones = false
      state.usuarios = payload
    },
    onLogoutUsuarios: (state) => {
      state.isLoadingUsuarios = true
      state.usuarios = []
    }
  }
})

export const {
  onAddNewUsuario,
  onDeleteUsuario,
  onLoadUsuarios,
  onLogoutUsuarios,
  onSetActiveUsuario,
  onUpdateUsuario
} = usuarioSlice.actions
