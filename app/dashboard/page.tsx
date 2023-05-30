"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import useSWR from "swr"

import video from "@/types/video"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { EmptyDashboard } from "@/components/emptydashboard"

async function fetcher(url: string) {
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}

export default function IndexPage() {
  const [items, setItems] = useState<video[]>([])
  const { data, error, isLoading, mutate } = useSWR<video[], string>(
    "/api",
    fetcher
  )

  const newlyAdded = (video: any) => {
    setItems((prev) => [...prev, video.record])
    mutate(video)
  }
  if (isLoading) return <h1>Loading...</h1>
  else if (error) return <h1>Error</h1>
  return (
    <div>
      {data?.length ===0 ? (
        <EmptyDashboard newlyAdded={newlyAdded} />
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Button className="font-semibold py-2 px-4 mt-2 rounded-md float-right mr-40 bg-primary text-primary-foreground hover:bg-primary/90">
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="mr-2 bg-primary"
                  />
                  Add New
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] sm:max-h-[400px]">
              <form>
                <div className="container flex flex-col items-center space-y-4">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
                    Its Empty Here !! Add a URL to get started.
                  </h1>
                  <Input
                    type="url"
                    className="w-96"
                    placeholder="Enter your URL here"
                  />
                  <Button type="submit">Transcribe</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
          <div className="container mx-auto p-4 md:px-20 flex justify-center">
            <div className="grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2 lg:grid-cols-3">
              {data?.map((item: video, index: number) => (
                <div className="card">
                  <Link href={`/transcript/${item.id}`}>
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      width={400}
                      height={200}
                      className={cn(
                        " object-cover transition-all hover:scale-105"
                      )}
                    />
                  </Link>

                  <div className="card-body">
                    <Link href={`/transcript/${item.id}`}>
                      <h5 className="mb-2 text-xl font-semibold">
                        {item.title}
                      </h5>
                    </Link>
                    <Link
                      href={`/transcript/${item.id}`}
                      className={buttonVariants({ variant: "default" })}
                    >
                      {item.transcription_status}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
