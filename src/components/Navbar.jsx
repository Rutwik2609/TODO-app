import React from 'react'

const Navbar = () => {
  return (
    <nav className=' flex justify-between bg-gradient-to-r from-red-400 to-blue-500 ... text-white p-2 '>
        <div>
            <span className=' text-xl mx-8' >TODO</span>
        </div>
        <ul className='flex gap-8 mx-8' >
            <li><button className='cursor-pointer hover:font-bold  p-1 rounded-md transition-all' >Home</button></li>
            <li><button className='cursor-pointer hover:font-bold  p-1 rounded-md transition-all' >Your Tasks</button></li>
        </ul>
    </nav>
  )
}

export default Navbar
