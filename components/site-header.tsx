"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import useSWR, { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { updateUser } from "@/app/services/dashboard_data"

import { Button } from "./ui/button"

export function SiteHeader() {
  const pathname = usePathname()
  const isSearch = pathname === "/"
  const [value, setValue] = useState("")
  const [queryParams, setQueryParams] = useState("")
  const options = {
    revalidate: false,
    populateCache: true,
  }

  const { trigger } = useSWRMutation("/api", updateUser, options)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    console.log(value)
    setQueryParams(value)
    trigger(value)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 pl-40 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        {!isSearch && (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-1 justify-end">
              <div className="flex space-x-2">
                <Input
                  type="input"
                  className="w-80"
                  placeholder="Search"
                  value={value}
                  onChange={handleChange}
                />
                <Button onClick={handleClick}>Search</Button>
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
