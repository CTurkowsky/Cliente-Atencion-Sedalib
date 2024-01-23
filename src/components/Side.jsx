import { useState, useEffect } from 'react'

function Side () {
  const [isOpen, setIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`bg-white w-64 absolute sm:relative h-full shadow-lg ${isOpen ? 'absolute' : ''}`} style={{ left: isOpen ? '0' : '', right: isOpen ? '0' : '' }}>
        {/* Sidebar content */}
      </div>
      <div className="w-full flex flex-col h-full overflow-y-auto">
        <div className="h-16 flex items-center justify-between px-6 bg-white">
          <button onClick={toggleSidebar} className="sm:hidden">
            <svg className="h-6 w-6 fill-current text-gray-500" viewBox="0 0 24 24">
              <path d="M3 6h18a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          {/* Main content */}
        </div>
      </div>
    </div>
  )
}

export default Side
