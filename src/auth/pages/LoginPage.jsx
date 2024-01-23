import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../hooks/useAuthStore'

export const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const { startLogin } = useAuthStore()

  const onSubmit = (data) => {
    startLogin(data)
    reset()
  }

  return (
    <>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          placeholder='email'
          {...register('email', { required: true })}
          />
        <input
          type='password'
          placeholder='password'
          {...register('password', { required: true })}
        />
        <button>Login</button>
      </form>
    </>
  )
}
