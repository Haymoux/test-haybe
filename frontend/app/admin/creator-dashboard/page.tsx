// import React from 'react'

import Link from "next/link";
import Image from 'next/image';
import  background from '../../../assets/Rectangle 9670.png'
import { FiUpload } from "react-icons/fi";
import { LuPenTool } from "react-icons/lu";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { coursesData } from "@/mock data/coursesData";
import CoursesCard from "@/components/Cards/CoursesCard";
import { bookData } from "@/mock data/bookData";
import BookCard from "@/components/Cards/BookCard";
import { articlesData } from "@/mock data/articlesData";

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

            <div className="w-full flex items-center gap-4 h-[15rem] mb-6">
                <Link href={`/admin/creator-dashboard`} className="flex items-center justify-center  h-full w-full bg-[#F7F7F7] shadow-sm" >
                    <div className="flex flex-col items-center gap-4">
                        <FiUpload  className="text-5xl"/>
                        <h3 className="text-[0.97rem] font-bold">Upload Course</h3>
                    </div>
                </Link>
                <Link href={`/admin/creator-dashboard`} className="flex items-center justify-center  h-full w-full bg-[#F7F7F7] shadow-sm">
                    <div className="flex flex-col items-center gap-4">
                        <RiContactsBookUploadLine className="text-5xl"/>
                        <h3 className="text-[0.97rem] font-bold">Upload E-book</h3>
                    </div>
                </Link>
                <Link href={`/admin/creator-dashboard`} className="flex items-center justify-center  h-full w-full bg-[#F7F7F7] shadow-sm">
                    <div className="flex flex-col items-center gap-4">
                        <LuPenTool  className="text-5xl"/>
                        <h3 className="text-[0.97rem] font-bold">Write a Blog</h3>
                    </div>
                </Link>
            </div>

            <div className="flex gap-2 items-center w-full">
                <h3 className="text-[1.05rem] font-bold w-[6.5rem]">My Courses</h3>
                <div className="h-0.5 w-full bg-black"></div>
            </div>

            <div className="py-6 flex gap-4 w-full items-center">
                {
                    coursesData.map((data, index) => (
                        <div key={index} >
                            <CoursesCard video={data.video} title={data.title} name={data.name} time={data.time}  />
                        </div>
                    ))
                }
            </div>
            
            <div className="flex gap-2 items-center w-full">
                <h3 className="text-[1.05rem] font-bold w-[6.5rem]">My Books</h3>
                <div className="h-0.5 w-full bg-black"></div>
            </div>

            <div className="py-6 flex gap-4 w-full items-center">
                {
                    bookData.map((data, index) => (
                        <div key={index} >
                            <BookCard image={data.image} title={data.title} desc={data.desc}  />
                        </div>
                    ))
                }
            </div>

            <div className="flex gap-2 items-center w-full">
                <h3 className="text-[1.05rem] font-bold w-[6.5rem]">My Articles</h3>
                <div className="h-0.5 w-full bg-black"></div>
            </div>

            <div className="py-6 flex gap-4 w-full items-center">
                {
                    articlesData.map((data, index) => (
                        <div key={index} >
                            <BookCard image={data.image} title={data.title} desc={data.desc}  />
                        </div>
                    ))
                }
            </div>

        </>
    )
}
