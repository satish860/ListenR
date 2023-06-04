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
    // Access the player through the ref
    playerRef.current = event.target;
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <div className="grid h-[650px] items-center justify-center pt-2 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative h-full flex-col p-10">
        <YouTube videoId={url} opts={opts} onReady={onPlayerReady} />
        <button onClick={getCurrentTime}>Get Current Time</button>
      </div>
    </div>
  )
}
