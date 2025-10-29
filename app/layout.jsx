import "./globals.css";
import { Kanit } from 'next/font/google';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
});

const logo = "https://queuequres3.s3.us-east-1.amazonaws.com/public/QueueCure_logo+(2).png"

export const metadata = {
  title: 'QueueCure',
  description: '',
  icons: {
    icon: logo,
    shortcut: logo,
    apple: logo
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
