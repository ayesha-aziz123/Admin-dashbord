import Layout from "@/components/layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Hekto Tuck",
  description: "Furniture Items here ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} ${font.className} bg-gray-900 antialiased`}>
        <div className="max-w-[1920px] mx-auto"> 
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
