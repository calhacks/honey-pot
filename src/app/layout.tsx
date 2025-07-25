import { Effect } from "effect";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Live, Rpc } from "@/rpc/client";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Honey Pot",
    description: "🍯",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}

const useGetAllProfiles = Effect.gen(function* () {
    const rpc = yield* Rpc;
    const response = yield* rpc["@honey-pot/schema/rpc/ProfileRpcs/GetAllProfiles"].call(
        {},
        {}
    );
    return response;
}).pipe(Effect.scoped);