"use client"

import React, { useState } from "react"
import ReactPlayer from "react-player/youtube"

interface Item {
  text: string
  speaker: number
  start: number
  end: number
}



export function TranscriptVideo({ url,data }: { url: string,data: Item[] }) 
{

  const handleProgress = (progress: any) => {
    console.log(progress)
  }

  return (
    <>
      <div className="flex">
        <div className="w-1/2 pt-10 pl-10">
        <ReactPlayer
          url={url}
          height={550}
          width={700}
          onProgress={handleProgress}
        />
        </div>

        <div className="h-[600px] w-1/2 overflow-hidden overflow-y-auto p-10 dark:border-r">
          {data.map((item: Item, index: number) => (
            <div key={index} className="mb-4">
              <p>
                ({item.start}) Speaker-{item.speaker}:{item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
