import Image from "next/image";

export default function Home() {
  return (
    <html lang="en">
    <body>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </body>
  </html>
  );
}
