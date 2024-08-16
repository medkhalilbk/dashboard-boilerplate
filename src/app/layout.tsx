import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/themeProvider"
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children } : any) {
  return (
   <SessionProvider> 
      <html lang="en" suppressHydrationWarning> 
      <title>Dashboard Tiktak</title>
         
      <head >
      <link
  rel="stylesheet"
  type="text/css"  
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
/>
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
/>
        </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      > 
      
     <ThemeProvider
            attribute="class"
            defaultTheme="light" 
             
          > 
          {children}
          <Toaster/>
            </ThemeProvider>
      
      </body>
    </html>
   </SessionProvider>
  )
}
