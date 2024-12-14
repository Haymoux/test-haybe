import TextEditor from '@/helper/TextEditor'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { TiArrowSortedDown } from 'react-icons/ti'

export default function UploadBlog() {
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
          Upload Blog 
        </h5>
        <div className='py-8'>

          <h2 className='font-bold text-[1.3rem]'>Blog Name</h2>

          <div className="flex w-full py-4 justify-between gap-4">
            <input type='text' placeholder='Blog Name' className='p-4 w-[58%] outline-none bg-[#f7f7f7] rounded-md' />
            <button title='dropdown' className='p-4 bg-[#f7f7f7] w-[42%] rounded-md'>
              <div className="flex pl-5 items-center justify-between">
                <h3 className='font-semibold'>Public</h3>
                <TiArrowSortedDown />
              </div>
            </button>
          </div>

            <div className="flex w-[46%] items-center gap-4 ">
                <button className='flex items-center justify-center pr-12 pl-4 py-3 rounded-lg bg-[#f7f7f7] gap-3'>
                    <AiOutlinePicture />
                    <span>Add Media</span>
                </button>
                <button className='flex items-center justify-center pr-12 pl-4 py-3 rounded-lg bg-[#f7f7f7] gap-3'>
                    <FaPen />
                    <span>Add Textbox</span>
                </button>
            </div>

          <div className="w-[58%] py-4">
            {/* <h2 className='font-bold text-[1.3rem]'>Add Book Description</h2> */}
            {/* <div className="py-4">
              <textarea placeholder='Write your ideas here' className='p-4 w-full h-[40vh] outline-none bg-[#f7f7f7] rounded-md' />
            </div> */}
            <TextEditor />
          </div>

          <button title='upload Book' className='bg-[#1B3664] py-2 px-12 rounded-md text-white'>Post</button>
        </div>
    </div>
  )
}