import { Inter } from "next/font/google";
import "../styles/globals.scss";
import StoreProvider from "@/redux/storeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recipe app",
  description: "write down your recipes",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
