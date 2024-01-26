export const FormLayout = ({ children, title = '' }) => {
  return (
      <div className='w-full sm:w-1/3 p-8  bg-white  rounded-lg shadow-lg animate__animated animate__fadeInUp'>
        <h2 className='text-xl font-semibold mb-4 text-center'>{title}</h2>
        {children}
      </div>
  )
}
