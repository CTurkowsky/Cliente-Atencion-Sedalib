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
export const useAttentionValidationSchema = () => {
  return yup.object().shape({
    codigo_suministro: yup
      .number()
      .transform(value => (value ? value.toString() : null))
      .test('len', 'El codigo debe tener entre 6 y 12 caracteres', val => val && val.length >= 6 && val.length <= 12),
    nombre: yup
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('El nombre es requerido'),
    doc_identidad: yup
      .number(),
    celular: yup
      .number(),
    email: yup
      .string()
      .email('Debe ser un correo válido'),
    modalidad: yup.string().required('La modalidad es requerida'),
    categoria: yup.string().required('La categoria es requerida'),
    sub_categoria: yup.string().required('La subcategoria es requerida'),
    problema: yup.string().required('El problema es requerido'),
    petitorio: yup.string().required('El petitorio es requerido'),
    numero_atencion: yup.string().required('El numero de atencion es requerido'),
    fecha: yup.string().required('La fecha es requerida'),
    departamento: yup.string().required('El departamento es requerido'),
    provincia: yup.string().required('La provincia es requerida'),
    distrito: yup.string().required('El distrito es requerido'),
    direccion: yup.string().required('La direccion es requerida')
  })
}
