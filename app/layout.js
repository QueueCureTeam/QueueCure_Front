import "./globals.css";

export const metadata = {
  title: "QueueCure",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">
        <main>{children}</main>
      </body>
    </html>
  );
}
