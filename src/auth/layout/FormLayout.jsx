export const FormLayout = ({ children, title = '' }) => {
  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-wave'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full animate__animated animate__fadeInUp'>
        <h2 className='text-center text-2xl sm:text-3xl'>{title}</h2>
        { children }
      </div>
    </div>
  )
}
