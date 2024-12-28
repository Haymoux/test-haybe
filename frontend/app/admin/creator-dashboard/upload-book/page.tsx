// import { RecentVideoCard } from '@/components/Cards/RecentVideoCard'
// import { recentVideoData } from '@/mock data/recentVideoData'
import UploadIcon from '@/components/Icons/UploadIcon'
import Link from 'next/link'
import React from 'react'
// import { FiUpload } from 'react-icons/fi'
import { TiArrowSortedDown } from 'react-icons/ti'

export default function UploadBook() {
  return (
    <div className=''>
        <h5 className='text-[0.7rem] mb-3 max-md:mb-2 text-gray-600 flex gap-1'>
          <Link href={`/`} className='hover:text-[#6694c2] hover:font-medium transition-colors duration-500 peer'>
            Homepage
          </Link>
           &gt;
          <Link href={`/admin/creator-dashboard`} className='hover:text-[#6694c2] hover:font-medium transition-colors duration-500 peer'>
            Creator Dashboard
          </Link> 
           &gt;
           <span className='text-[#6694c2] font-medium transition-colors duration-500 peer-hover:text-gray-700'>
            Upload Book
           </span>
        </h5>  
        <div className='py-6 max-md:py-4'>

          <h2 className='font-bold text-[1.15rem]'>Book Name</h2>

          <div className="flex w-full py-4 max-md:py-2 justify-between gap-4">
            <input type='text' placeholder='Book Name' className='p-4 max-md:p-2 w-[58%]  text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md' />
            <button title='dropdown' className='p-4 max-md:p-2 bg-[#f7f7f7] w-[42%] rounded-md'>
              <div className="flex pl-5 max-md:pl-1 items-center justify-between">
                <h3 className='font-semibold  text-[0.86rem]'>Public</h3>
                <TiArrowSortedDown />
              </div>
            </button>
          </div>

          <div className="flex w-full py-4 h-[66vh] justify-between gap-4">
            <button title='upload Book' className='p-4 bg-[#f7f7f7] w-[58%] max-md:w-full rounded-md'>
                <div className="flex flex-col items-center gap-2">
                    {/* <FiUpload className="text-5xl"/> */}
                    <UploadIcon />
                    <h3 className="text-[0.97rem] font-medium text-[#1A1A1A]">Upload Book</h3>
                </div>
            </button>
          </div>

          <div className="w-[58%] max-md:w-full py-4">
            <h2 className='font-bold text-[1.15rem]'>Add Book Title</h2>
            <div className="py-4 mb-5">
              <input type='text' placeholder='Write your ideas here' className='p-4 w-full  text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md' />
            </div>
            <h2 className='font-bold text-[1.15rem]'>Add Book Description</h2>
            <div className="py-4">
              <textarea placeholder='Write your ideas here' className='p-4 w-full h-[40vh]  text-[0.86rem] outline-none bg-[#f7f7f7] rounded-md' />
            </div>
          </div>

          <button title='upload Book' className='bg-[#1B3664] py-2 px-12  text-[0.86rem] rounded-md text-white'>Post</button>
        </div>
    </div>
  )
}
