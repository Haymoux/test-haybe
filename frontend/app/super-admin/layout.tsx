import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="flex h-screen w-full font-inter">
      <div className="flex w-full">
        <SideBar />
        <div className="flex size-full flex-col">
          <NavBar />
          <div className="h-[84vh] max-md:h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
