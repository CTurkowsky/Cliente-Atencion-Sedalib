/* eslint-disable no-undef */
import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables()
const atencionApi = axios.create({
  baseURL: VITE_API_URL
})

// Todo: configurar interceptores

atencionApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }
  return config
})
export default atencionApi
