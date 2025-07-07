import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata = {
  title: "Quotify",
  description: "Quotify - Your Quote Generator App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
