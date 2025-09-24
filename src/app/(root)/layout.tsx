import Footer from "@/modules/home/ui/components/Footer";
import Navbar from "@/modules/home/ui/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
