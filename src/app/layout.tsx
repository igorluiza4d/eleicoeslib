import localFont from "next/font/local";
import "./globals.css";
import PrelineScript from './components/PrelineScript';
import Headerpage from "./components/Headerpage";

import Footerpage from "./components/Footerpage";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <Headerpage />
        {children}
        <Footerpage />
      </body>
      <PrelineScript />
    </html>
  );
}
