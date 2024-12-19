// import { RecentVideoCard } from '@/components/Cards/RecentVideoCard'
// import { recentVideoData } from '@/mock data/recentVideoData'
import Link from 'next/link'
import React from 'react'
import { FiUpload } from 'react-icons/fi'
import { TiArrowSortedDown } from 'react-icons/ti'

export default function UploadBook() {
  return (
    <div className=''>
        <h5 className='text-xs mb-4 text-gray-600 flex gap-1'>
          <Link href={`/`}>
            Homepage
          </Link>
           &gt;
          <Link href={`/admin/creator-dashboard`}>
            Creator Dashboard
          </Link> 
           &gt;
          Upload Book
        </h5>  
        <div className='py-8'>

          <h2 className='font-bold text-[1.3rem]'>Book Name</h2>

          <div className="flex w-full py-4 justify-between gap-4">
            <input type='text' placeholder='Book Name' className='p-4 w-[58%] outline-none bg-[#f7f7f7] rounded-md' />
            <button title='dropdown' className='p-4 bg-[#f7f7f7] w-[42%] rounded-md'>
              <div className="flex pl-5 items-center justify-between">
                <h3 className='font-semibold'>Public</h3>
                <TiArrowSortedDown />
              </div>
            </button>
          </div>

          <div className="flex w-full py-4 h-[66vh] justify-between gap-4">
            <button title='upload Book' className='p-4 bg-[#f7f7f7] w-[58%] rounded-md'>
                <div className="flex flex-col items-center gap-4">
                    <FiUpload className="text-5xl"/>
                    <h3 className="text-[0.97rem] font-bold">Upload Book</h3>
                </div>
            </button>
            {/* <div className='w-[42%] flex flex-col justify-between'>
              <div className='flex gap-1 flex-col'>
                {
                    recentBookData.slice(0, 3).map((data, index) => (
                        <div key={index} className='w-full h-[33%]' >
                            <RecentBookCard image={data.image} title={data.title} desc={data.desc}  />
                        </div>
                    ))
                }
              </div>
              <button className='bg-[#1B3664] p-2 text-white flex gap-4 items-center justify-center'>
                <FiUpload className="text-lg"/>
                <span>Upload Another Book</span>
              </button>
            </div> */}
          </div>

          <div className="w-[58%] py-4">
            <h2 className='font-bold text-[1.3rem]'>Add Book Title</h2>
            <div className="py-4 mb-5">
              <input type='text' placeholder='Write your ideas here' className='p-4 w-full outline-none bg-[#f7f7f7] rounded-md' />
            </div>
            <h2 className='font-bold text-[1.3rem]'>Add Book Description</h2>
            <div className="py-4">
              <textarea placeholder='Write your ideas here' className='p-4 w-full h-[40vh] outline-none bg-[#f7f7f7] rounded-md' />
            </div>
          </div>

          <button title='upload Book' className='bg-[#1B3664] py-2 px-12 rounded-md text-white'>Post</button>
        </div>
    </div>
  )
}
