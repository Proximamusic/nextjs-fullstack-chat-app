import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@components/ToasterContext";
import AuthProvider from "@components/AuthProvider";
import Navbar from "@components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Halo Chat App",
  description: "Full stack  Next14 chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-purple-1 ${inter.className}`}>
        <ToasterContext />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
