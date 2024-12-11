import Link from 'next/link';
import React from 'react'

interface CoursesCardProps {
    video?: string;
    title: string;
    name: string;
    time: string;
  }

const CoursesCard: React.FC<CoursesCardProps> = ({ video, title, name, time }) => {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
            <video src={video}></video>
            <div className="flex flex-col items-start px-3 pt-4 pb-3 rounded-b-lg gap-2 border">
                <h2 className='text-lg w-[70%]'>{title}</h2>
                <h5 className='text-xs'>{name}</h5>
                <h5 className='text-xs'>{time}</h5>
            </div>
        </div>
        <div className='flex'>
            <Link href={`/`} className='border-[#1B3664] border text-[#1B3664]'>Edit Content</Link>
            <Link href={`/`} className='bg-[#1B3664] text-white'>Preview</Link>
        </div>
    </div>
  )
}

export default CoursesCard
