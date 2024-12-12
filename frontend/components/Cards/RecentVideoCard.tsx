import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'

interface CardProps {
    image: string | StaticImageData;
    title: string;
    desc: string;
}

export const RecentVideoCard:React.FC<CardProps> = ({image, title, desc}) => {
  return (
    <div className='flex gap-4'>
        <Image
            src={image}
            alt=''
            className='h-[100px] object-contain'
        />
        <div className='flex flex-col gap-1'>
                <div className="flex items-center gap-2">
                    <span className='font-semibold'>{title}</span>
                    <div className="text-sm">
                        <FaPencilAlt />
                    </div>
                </div>
                <h4 className="text-[0.65rem]">{desc}</h4>
        </div>
    </div>
  )
}
