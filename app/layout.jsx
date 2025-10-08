import "./globals.css";
import { Kanit } from 'next/font/google';
import Navbar from "../components/user/Navbar";

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
});

export const metadata = {
  title: "QueueCure",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
