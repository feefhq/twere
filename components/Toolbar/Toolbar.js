import React from 'react'

const Toolbar = ({ children }) => {
  return (
    <div className='bg-gray-800 flex flex-row justify-items-center justify-center py-2'>
      {children}
    </div>
  )
}

export default Toolbar
