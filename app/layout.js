import { ThemeProvider } from "@/components/theme-provider";

import { dbConnect } from "@/service/mongo";
import { SessionProvider } from "next-auth/react";
import { Inter, Roboto_Slab } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import CartItemCountProvider from "./provider/CartItemCountProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Khuda-Lagche",
  description: "Best for your hungry solution",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${inter.variable} ${roboto_slab.variable}`}
    >
      <body>
        <SessionProvider>
          <CartItemCountProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <div id='portal-root'></div>
            </ThemeProvider>
            <Toaster position='top-center' richColors closeButton />
          </CartItemCountProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
