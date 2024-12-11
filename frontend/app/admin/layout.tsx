'use client'

import { AdminFooter } from "@/components/AdminFooter";
import { AdminNav } from "@/components/AdminNav";
import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <main className="h-screen w-full font-inter">
        <AdminNav />
          <div className="overflow-y-auto mx-20 max-sm:mx-4 my-2 pb-12">
            {children}
          </div>
        <AdminFooter />
    </main>
  );
}