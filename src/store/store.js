import { configureStore } from '@reduxjs/toolkit'
import { authSlice, atencionSlice } from './'
import { usuarioSlice } from './usuario/usuarioSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    atencion: atencionSlice.reducer,
    usuario: usuarioSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
