import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Socially Crypto",
  description: "A social platform form cryptocurrency enthusiast, investors, and developers to share their thoughts and ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>Socially Crypto</header>
        <h1>Welcome!</h1>
        {children}
      </body>
    </html>
  );
}
