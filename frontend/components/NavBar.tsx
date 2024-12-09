'use client'

import React from 'react'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { GoBell } from "react-icons/go";
import { IoMdArrowDropdown } from 'react-icons/io';

interface NavBarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className='top-0 p-10 flex w-full items-center justify-between'>
      <div className='flex items-center w-full gap-16 max-sm:gap-2'>
        {/* Hamburger menu for mobile */}
        <button 
          className='md:hidden mr-4'
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h2 className='text-[1.4rem] max-sm:text-[1.1rem] font-bold'>Hello John</h2>
        <div className='w-[38%] bg-black h-0.5 hidden md:block max-sm:hidden'></div>
      </div>
      <div className='flex gap-4 items-center w-[20vw] max-sm:w-[30vw]'>
        <button title='notification'>
          <GoBell width={16} />
        </button>
        <h3 className='font-semibold max-sm:text-sm'>John Doe</h3>
        <button title='User' className='flex gap-1 items-center'>
          <div className='w-12 h-12 max-sm:w-10 max-sm:h-10 bg-slate-100 rounded-full text-white items-center text-2xl max-sm:text-lg justify-center flex border'>
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

