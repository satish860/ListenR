"use client"

import React, { useRef } from "react"
import ReactPlayer from 'react-player/youtube'

export function TranscriptVideo({ url }: { url: string }) {



  const opts = {
    height: "550",
    width: "700",
    playerVars: {
    },  
  }

  return (
      <div className="relative flex-col pl-10 pt-10">
        <ReactPlayer url={url} />
      </div>
  )
}
