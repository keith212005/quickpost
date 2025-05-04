import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <html lang="en">
    <body>
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1">{children}</main>
      </div>
    </body>
  </html>
  );
}
