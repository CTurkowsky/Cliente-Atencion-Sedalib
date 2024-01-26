// hooks/useValidationSchema.js
import * as yup from 'yup'

export const useLoginValidationSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email('Correo o contraseña incorrecta')
      .required('El correo es requerido'),
    password: yup
      .string()
      .min(6, 'Correo o contraseña incorrecta')
      .required('La contraseña es requerida')
  })
}

export const useRegisterValidationSchema = () => {
  return yup.object().shape({
    nombre: yup
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('El nombre es requerido'),
    apellidos: yup
      .string()
      .min(3, 'Los apellidos deben tener al menos 3 caracteres')
      .required('Los apellidos es requerido'),
    email: yup
      .string()
      .email('Debe ser un correo válido')
      .required('El correo es requerido'),

    modalidad: yup.string().required('La modalidad es requerida')
  })
}
