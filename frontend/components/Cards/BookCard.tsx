import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface BookCardProps {
    image?: string | StaticImageData;
    title: string;
    desc: string;
    // time: string;
  }

const BookCard: React.FC<BookCardProps> = ({ image, desc, title }) => {
  return (
    <div className='flex flex-col gap-6 shadow-sm'>
        <div className='flex flex-col'>
            {/* <video src={video} className='border shadow'></video> */}
            <Image
                src={image ? image : '' }
                alt={`image of ${image}`}
                className='border-4'
             />
            <div className="flex flex-col items-start px-3 pt-4 pb-3 rounded-b-lg gap-2">
                <h2 className='text-lg font-bold'>{title}</h2>
                <h5 className='text-xs'>{desc}</h5>
            </div>
        </div>
        <div className='flex gap-2'>
            <Link href={`/`} className='border-[#1B3664] border px-2 py-1 rounded-md text-[#1B3664]'>Edit Content</Link>
            <Link href={`/`} className='bg-[#1B3664] px-2 py-1 rounded-md text-white'>Preview</Link>
        </div>
    </div>
  )
}

export default BookCard