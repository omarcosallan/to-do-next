import { MainNav } from "@/components/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "@/context/AuthContext";
import { FilterContextProvider } from "@/context/FilterType";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TO DO LIST",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} min-h-screen`}>
        <AuthContextProvider>
          <FilterContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <MainNav />
              <div className="flex flex-col text-center justify-center items-center px-5 md:px-20">
                {children}
              </div>
            </ThemeProvider>
          </FilterContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
