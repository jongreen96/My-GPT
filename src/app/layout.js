import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "My-GPT | %s",
    default: "My-GPT",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="m-auto h-svh w-full max-w-7xl pt-14 sm:pl-14 sm:pt-0">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
