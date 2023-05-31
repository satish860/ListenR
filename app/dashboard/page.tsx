"use client"

import React, { ChangeEvent, useState,MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { Loader2 } from "lucide-react"
import useSWR from "swr"
import { useSWRConfig } from "swr"
import { v4 as uuidv4 } from "uuid"
import video from "@/types/video"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { EmptyDashboard } from "@/components/emptydashboard"

async function fetcher(url: string) {
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}

export default function IndexPage() {
  const [items, setItems] = useState<video[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const { data, error, isLoading } = useSWR<video[], string>(
    "/api",
    fetcher
  )
  const { mutate } = useSWRConfig()

  const [loader, setloader] = useState(false)
  const [open, setOpen] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>)  => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    setloader(true)
    event.preventDefault()
    const uuid = uuidv4()
    const request1 = await axios.post("/api", { url: inputValue, id: uuid })
    const request2 = await axios.post("/api/transcript", { url: inputValue, id: uuid })
    await Promise.all([request1, request2]);
    console.log("Both requests fired in parallel.");
    setloader(false)
    setOpen(false)
    setInputValue("")
    mutate("/api")
  }

  const newlyAdded = (video: any) => {
    setItems((prev) => [...prev, video.record])
    mutate(video)
  }
  if (isLoading) return <h1>Loading...</h1>
  else if (error) return <h1>Error</h1>
  return (
    <div>
      {data?.length === 0 ? (
        <EmptyDashboard newlyAdded={newlyAdded} />
      ) : (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div>
                <Button className="float-right mr-40 mt-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90">
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="mr-2 bg-primary"
                  />
                  Add New
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-h-[400px] sm:max-w-[600px]">
              <form>
                <div className="container flex flex-col items-center space-y-4">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
                    Transcribe from URL
                  </h1>
                  <Input
                    type="url"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-96"
                    placeholder="Enter your URL here"
                  />
                  <DialogFooter>
                    {loader ? (
                      <Button>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Please wait</span>
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit}> Transcribe </Button>
                    )}
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div className="container mx-auto flex justify-center p-4 md:px-20">
            <div className="grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2 lg:grid-cols-3">
              {data?.map((item: video, index: number) => (
                <div key={index} className="card">
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
