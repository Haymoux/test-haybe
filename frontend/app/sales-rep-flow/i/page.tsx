// import React from 'react'

import { BiSpreadsheet } from "react-icons/bi";
import { GiAtomicSlashes } from "react-icons/gi";

export default function Dashboard() {
    return (
     <div className="max-md:mx-5 gap-8 p-5 h-full bg-[#F1F0F2] flex items-center justify-center">
        <div className="bg-white w-full h-full overflow-y-auto scroll-m-4 p-5">
            <div className="flex w-full text-[0.75rem] mb-5 justify-between items-center">
                <button className="px-6 py-2 rounded-md border border-[#003366] text-[#003366] font-semibold shadow-sm">Add new lead</button>
                <div className="flex gap-4">
                    <button className="px-5 py-2 rounded-md border border-[#003366] text-[#003366] font-semibold shadow-sm">Create new campaign</button>
                    <button className="px-5 py-2 rounded-md border border-[#003366] text-[#003366] font-semibold shadow-sm">Schedule Meeting</button>
                </div>
            </div>
            <div className="w-full h-full flex items-center gap-3">
                <div className="w-full h-full gap-3 flex flex-col">
                    <div className='h-[94px] text-[#56575A] font-medium w-full flex gap-2'>
                        <div className="w-full border shadow-sm h-full justify-between bg-[#F6FAFF] border-[#B7D2FF] rounded-md p-2 flex flex-col">
                            <div className="flex w-full items-center gap-2">
                                <BiSpreadsheet size={18} />
                                <span className="text-[0.68rem]">Total Training package</span>
                            </div>
                            <div className="h-[1px] w-full border"></div>
                            <span>478</span>
                        </div>
                        <div className="w-full border shadow-sm h-full justify-between bg-[#F6FAFF] border-[#B7D2FF] rounded-md p-2 flex flex-col">
                            <div className="flex w-full items-center gap-2">
                                <GiAtomicSlashes size={18} />
                                <span className="text-[0.68rem]">Total Ad sales</span>
                            </div>
                            <div className="h-[1px] w-full border"></div>
                            <span>478</span>
                        </div>

                    </div>
                    <div className="h-full gap-3 w-full flex flex-col">
                        <div className="h-[50%] w-full border">
                            <div></div>
                            <div></div>
                            <div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `60%` }}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="h-[50%] w-full border"></div>
                    </div>
                </div>
                <div className="w-[70%] h-full border "></div>
                <div className="w-full h-full border "></div>
            </div>
        </div>
    </div>   
    )
}
