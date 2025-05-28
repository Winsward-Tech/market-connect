import "./globals.css";
import { Inter } from "next/font/google";
import { ClientLayout } from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Market Connect",
  description: "Empowering Ghanaian market women and farmers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
