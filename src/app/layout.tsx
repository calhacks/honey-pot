import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const sfPro = localFont({
	src: "../assets/fonts/SF_Pro.ttf",
	variable: "--font-sf",
});

export const metadata: Metadata = {
	title: "Honey Pot",
	description: "🍯",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${sfPro.className} antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
