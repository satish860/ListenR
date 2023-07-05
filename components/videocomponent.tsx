"use client"

import React, { useEffect, useRef, useState } from "react"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactPlayer from "react-player/lazy"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Item {
  text: string
  speaker: number
  start: number
  end: number
}

export function TranscriptVideo({
  url,
  data,
  summary,
  isyoutube,
}: {
  url: string
  data: Item[]
  summary: string[]
  isyoutube: boolean
}) {
  const [currentTime, setCurrentTime] = useState(0)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer | null>(null)

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

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      setCurrentTime(time)
      playerRef.current.seekTo(time, "seconds")
    }
  }

  const handleReady = () => {
    playerRef.current = playerRef.current as ReactPlayer
  }

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    return formattedTime
  }

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filteredData, setFilteredData] = useState<Item[]>([])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const searchItems = () => {
    if (!searchTerm) {
      return data
    }
    const searchText = searchTerm.toLowerCase()
    const filteredItems = data.filter((item: Item) =>
      item.text.toLowerCase().includes(searchText)
    )

    return filteredItems
  }

  useEffect(() => {
    const filteredItems = searchItems()
    console.log(filteredItems)
    setFilteredData(filteredItems)
  }, [searchTerm])

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
        <div className="w-1/2 pl-10 pt-10">
          {isyoutube ? (
            <ReactPlayer
              ref={playerRef}
              url={url}
              height={550}
              width="auto"
              controls={true}
              onProgress={handleProgress}
              onReady={handleReady}
            />
          ) : (
            <ReactPlayer
              url={url}
              controls={true}
              ref={playerRef}
              onProgress={handleProgress}
              config={{
                file: {
                  forceAudio: true,
                },
              }}
            />
          )}
        </div>

        <div className="w-1/2 pl-10 pt-10">
          <div className="flex space-x-2 pl-10">
            <Input
              type="input"
              className="w-80"
              placeholder="Search Transcript"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
          <div className="h-[600px] overflow-hidden overflow-y-auto p-10 dark:border-r">
            <Tabs defaultValue="transcript" className="w-auto">
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent
                className="w-auto"
                ref={resultRef}
                value="transcript"
              >
                {filteredData.map((item: Item, index: number) => (
                  <div key={index}>
                    <Button
                      onClick={() => handleSeek(item.start)}
                      className="start-button mb-2"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      {formatTime(item.start)}
                    </Button>
                    <p>Speaker-{item.speaker}:</p>
                    <p
                      className={`mb-4 ${
                        index === highlightedIndex ? "highlight" : ""
                      }`}
                    >
                      {replaceWords(item.text)}
                    </p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="summary">
                <ul>
                  {summary.map((item, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                      - {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

function replaceWords(text: string): string {
  const wordMap: Record<string, string> = {
    rod: "Lord",
    milod: "My Lord",
    milot: "My Lord",
    logshifts: "Lordships",
    malad: "My Lord",
    malod: "My Lord",
    malot: "My Lord",
  }

  return text.replace(
    /rod|milod|milot|logshifts|malad|malod|malot/gi,
    (matched) => wordMap[matched.toLowerCase()] || matched
  )
}
