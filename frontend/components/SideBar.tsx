import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../assets/hos logo (2).png'

export const SideBar = () => {
  return (
    <div className='left-0  px-10 py-8 border flex flex-col justify-between'>
        <div className='flex flex-col gap-10 w-full max-sm:w-[50vw] max-md:text-sm '>
            <Image
              src={ logo }  
              alt='HOS Logo'
              className='w-[10rem]'
            />
            <div className='flex flex-col gap-5 text-[0.95rem]'>
              <Link href={`/super-admin/dashboard`}>Dashboard</Link>
              <Link href={`/super-admin/user-management`}>User Management</Link>
              <Link href={`/super-admin/content-management`}>Content Management</Link>
              <Link href={`/super-admin/advertisement-management`}>Advertisement Management</Link>
              <Link href={`/super-admin/financials`}>Financials</Link>
            </div>
        </div>
        <div className='flex flex-col gap-4 text-[0.9rem]'>
            <button className='border-2 py-[0.3rem]'>Sign Out</button>
            <button disabled className=' outline-none text-white'>Sign Out</button>
        </div>
    </div>
  )
}
