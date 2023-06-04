"use client"

import React, { useRef, useState } from "react"
import ReactPlayer from "react-player/youtube"

interface Item {
  text: string
  speaker: number
  start: number
  end: number
}

export function TranscriptVideo({ url, data }: { url: string; data: Item[] }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null); 


  const handleProgress = (progress: any) => {
    setCurrentTime(progress.playedSeconds)

    const currentItemIndex = data.findIndex(
      (item) =>
        item.start <= progress.playedSeconds &&
        item.end >= progress.playedSeconds
    )

    setHighlightedIndex(currentItemIndex)
    if (resultRef.current && highlightedIndex >= 0) {
      const itemRef = resultRef.current.children[highlightedIndex]
      if (itemRef) {
        itemRef.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  return (
    <>
      <style>
        {`
        .highlight {
          background-color: yellow;
          font-weight: bold;
        }
        `}
      </style>

      <div className="flex">
        <div className="w-1/2 pt-10 pl-10">
          <ReactPlayer
            url={url}
            height={550}
            width={700}
            controls={true}
            onProgress={handleProgress}
          />
        </div>

        <div className="h-[600px] w-1/2 overflow-hidden overflow-y-auto p-10 dark:border-r" ref={resultRef}>
          {data.map((item: Item, index: number) => (
            <div
              key={index}
              className={`mb-4 ${
                index === highlightedIndex ? "highlight" : ""
              }`}
            >
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
