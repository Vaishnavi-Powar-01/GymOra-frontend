
import "./globals.css";
import { Anton, Roboto } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton", // This sets a CSS variable for use in Tailwind
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: "GymOra",
  description: "Organic Product Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${roboto.variable}`}>
      <body className="font-roboto bg-white text-black">
        <div className="min-h-screen bg-white">
          {children}
      <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
