import React from 'react'
import { FaUser } from 'react-icons/fa';
import { GoBell } from "react-icons/go";
import { IoMdArrowDropdown } from 'react-icons/io';

export const NavBar = () => {
  return (
    <div className='top-0 p-10 flex w-full items-center justify-between'>
        <div className='flex items-center w-full gap-16'>
          <h2 className='text-[1.4rem] font-bold'>Hello John</h2>
          <div className='w-[38%] bg-black h-0.5 '></div>
        </div>
        <div className='flex gap-4 items-center w-[20vw]'>
            <button title='notification'>
              <GoBell width={16} />
            </button>
            <h3 className='font-semibold'>John Doe</h3>
            <button title='d' className='flex gap-1 items-center'>
              <div className='w-12 h-12 bg-slate-100 rounded-full text-white items-center text-2xl justify-center flex border'>
                <FaUser />
              </div>
              <div>
                <IoMdArrowDropdown />
              </div>
            </button>
        </div>
    </div>
  )
}
