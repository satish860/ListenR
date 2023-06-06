import "@/styles/globals.css"
import { Metadata } from "next"
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const publicPages = ["/"]

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  pathname: string
}

export default function RootLayout({ children, pathname }: RootLayoutProps) {
  
  const isPublicPage = true;

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />

        <ClerkProvider>
          {isPublicPage ? (
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
              )}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                <TailwindIndicator />
              </ThemeProvider>
            </body>
          ) : (
            <>
              <SignedIn>
                <body
                  className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                  )}
                >
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                  >
                    <div className="relative flex min-h-screen flex-col">
                      <SiteHeader />
                      <div className="flex-1">{children}</div>
                    </div>
                    <TailwindIndicator />
                  </ThemeProvider>
                </body>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn afterSignInUrl="/dashboard"/>
              </SignedOut>
            </>
          )}
        </ClerkProvider>
      </html>
    </>
  )
}
