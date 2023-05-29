"use client"

import React, { useState } from "react"
import Image from "next/image"
import axios from "axios"
import useSWR from "swr"
import Link from "next/link"

import video from "@/types/video"
import { cn } from "@/lib/utils"
import { EmptyDashboard } from "@/components/emptydashboard"
import { buttonVariants } from "@/components/ui/button"


async function fetcher(url: string) {
  var response = await axios.get(url)
  console.log(response.data)
  return response.data
}

export default function IndexPage() {
  const [items, setItems] = useState<video[]>([])
  const { data, error, isLoading, mutate } = useSWR<video[], string>(
    "/api",
    fetcher
  )
  console.log(data)

  const newlyAdded = (video: any) => {
    setItems((prev) => [...prev, video.record])
    mutate(video)
  }
  if (isLoading) return <h1>Loading...</h1>
  else if (error) return <h1>Error</h1>
  return (
    <div>
      {data?.data.length === 0 ? (
        <EmptyDashboard newlyAdded={newlyAdded} />
      ) : (
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((item: video, index: number) => (
              <div className="card">
              <Image
                src={item.thumbnail_url}
                alt={item.title}
                width={200}
                height={300}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  "aspect-square"
                )}
              />
              <div className="card-body">
                <h5 className="mb-2 text-xl font-semibold">{item.title}</h5>
                <Link href={`/transcript/${item.id}`} className={buttonVariants({ variant: "default" })}>{item.transcription_status}</Link>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
