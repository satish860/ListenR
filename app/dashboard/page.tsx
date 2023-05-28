"use client"

import React, { useState } from "react"

import video from "@/types/video"
import { EmptyDashboard } from "@/components/emptydashboard"

export default function IndexPage() {
  const [items, setItems] = useState<video[]>([])

  const newlyAdded = (video: any) => {
    console.log("I am here in newly added method.")
    console.log(video.record)
    setItems((prev) => [...prev, video.record])
  }
  return (
    <div>
      {items.length === 0 ? (
        <EmptyDashboard newlyAdded={newlyAdded} />
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
