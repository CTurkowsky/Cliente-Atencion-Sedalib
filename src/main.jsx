import React from 'react'
import ReactDOM from 'react-dom/client'
import { AtencionesApp } from './AtencionesApp'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AtencionesApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
