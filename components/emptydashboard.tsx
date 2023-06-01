"use client"

import React, { ChangeEvent, useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

import video from "@/types/video"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EmptyDashboardProps {
  newlyAdded?: (video: video) => void
}

export function EmptyDashboard({ newlyAdded }: EmptyDashboardProps) {
  const [inputValue, setInputValue] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const uuid = uuidv4()
    const request1 = await axios.post("/api", { url: inputValue, id: uuid })
    const request2 = await axios.post("/api/transcript", {
      url: inputValue,
      id: uuid,
    })
   const response = await Promise.all([request1, request2])
    if (newlyAdded) {
      newlyAdded(response[0].data)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Its Empty Here !! Add a URL to get started.
        </h1>
        <Input
          type="url"
          value={inputValue}
          onChange={handleInputChange}
          className="w-96"
          placeholder="Enter your URL here"
        />
        {loading && <p>Loading...</p>}
        <Button type="submit">Transcribe</Button>
      </div>
    </form>
  )
}
