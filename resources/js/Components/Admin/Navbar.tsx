import React from 'react'
import { FaBars, FaSearch } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer'/>
        <span className='text-white font-semibold'>Learn-Hub</span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65'>
            <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2  '>
              <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch/></button>
              <input type="text" className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block'/>
            </span>
        </div>
      </div>
    </nav>
  )
}
