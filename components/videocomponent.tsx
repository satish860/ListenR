"use client"

import React, { useRef } from "react"
import YouTube from "react-youtube"

export function TranscriptVideo({ url }: { url: string }) {
  const playerRef = useRef<YouTube | null>(null);

  const getCurrentTime = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.internalPlayer.getCurrentTime();
      console.log('Current Time:', currentTime);
    }
  };

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
  };

  const opts = {
    height: "550",
    width: "700",
    playerVars: {
    },  
  }

  return (
      <div className="relative flex-col pt-10 pl-10">
        <YouTube videoId={url} opts={opts} onReady={onPlayerReady} />
      </div>
  )
}
