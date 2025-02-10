import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Hekto Web",
  description: "Furniture Items here ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} ${font.className} antialiased`}>
        <div className="max-w-[1920px] mx-auto">

            {children}
        </div>
      </body>
    </html>
  );
}
