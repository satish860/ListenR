'use client';

import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "./ui/button"
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname();
  const isSearch = pathname === '/';
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 pl-40 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        {!isSearch && (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-1 justify-end">
              <div className="flex flex-col items-center space-x-2">
                <Input type="input" className="w-80" placeholder="Search" />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href={siteConfig.links.signin}>
                <Button variant="default" className="flex items-center ">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  )
}
