// import React from 'react'

import Link from "next/link";
import Image from 'next/image';
import  background from '../../../assets/Rectangle 9670.png'

export default function CreatorDashboard() {
    return (
        <>
            <h5 className='text-xs mb-4 text-gray-600'>Homepage &gt; Creator Dashboard </h5>
            <div className="w-full">
                <Image 
                    src={background}
                    alt="Background Image"
                    className="my-8"
                />
            </div>

            <div className='w-full'>
                <div className="flex gap-3 max-lg:grid max-lg:w-full">
                    <div className='shadow-md rounded-lg border w-[50%] max-lg:w-full grid gap-4 py-5 px-6' >
                        <div className="w-full h-[10rem] grid gap-4">
                            <div className="w-full border rounded-md"></div>
                            <div className="w-full border rounded-md"></div>
                        </div>
                        <div className="flex w-full justify-between font-semibold text-[0.9rem]">
                            <Link href={ `/super-admin/content-management`}>Manage Forum </Link>
                            <Link href={ `/super-admin/content-management`}>View All</Link>
                        </div>
                    </div>
                    <div className='shadow-md rounded-lg border w-[50%] max-lg:w-full grid gap-4 py-5 px-6' >
                        <div className="w-[76%] h-[10rem] flex gap-4">
                            <div className="h-full w-full border rounded-md"></div>
                            <div className="h-full w-full border rounded-md"></div>
                        </div>
                        <div className="flex w-full justify-between font-semibold text-[0.9rem]">
                            <Link href={ `/super-admin/content-management`}>Manage Library </Link>
                            <Link href={ `/super-admin/content-management`}>View All</Link>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    )
}
