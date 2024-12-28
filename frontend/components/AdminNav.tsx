'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaUser } from 'react-icons/fa';
// import { GoBell } from "react-icons/go";
import logo from '../assets/hos logo (2).png'
import { HiMiniBars3BottomRight } from 'react-icons/hi2';


export const AdminNav: React.FC = () => {
  return (
    <div className='top-0 py-3 px-20 max-md:px-4 max-lg:px-10 flex items-center justify-between'>
        <div className='flex items-center w-full gap-16 max-sm:gap-2'>
            <Link href={`/admin/creator-dashboard`}>
                <Image
                    src={logo}  
                    alt='HOS Logo'
                    className='w-[10rem]'
                />
            </Link>
            <input placeholder="Search" className="border bg-[#EFEFEF] w-[12rem] px-2 py-1 text-[0.75rem] outline-none rounded-sm" />
        </div>
        <div className='flex gap-4 items-center  justify-between max-md:justify-end w-[12rem]'>
            <h3 className='font-semibold max-sm:text-sm max-md:hidden text-[0.9rem]'>John Doe</h3>
            <button title='User' className='flex gap-1 items-center'>
            <div className='w-[2.75rem] h-[2.75rem] max-sm:w-10 max-sm:h-10 bg-slate-100 rounded-full text-white items-center text-lg max-sm:text-base justify-center flex border'>
                <FaUser />
            </div>
            </button>
            <button title='notification'>
                <HiMiniBars3BottomRight />
            </button>
        </div>
    </div>
  )
}

