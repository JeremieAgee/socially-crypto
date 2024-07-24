import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Socially Crypto",
	description:
		"A social platform for cryptocurrency enthusiasts, investors, and developers to share their thoughts and ideas.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-gray-100 text-gray-900`}>
				<header className="bg-gray-800 text-white py-4">
					<div className="container mx-auto flex justify-between items-center px-4">
						<h1 className="text-2xl font-bold">Socially Crypto</h1>
					</div>
				</header>
				<main className="container mx-auto px-4 py-8">{children}</main>
				<footer className="bg-gray-800 text-white py-4 mt-8">
					<div className="container mx-auto text-center">
						<p>&copy; 2024 Socially Crypto. All rights reserved.</p>
					</div>
				</footer>
			</body>
		</html>
	);
}
