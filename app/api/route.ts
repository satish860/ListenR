import { NextResponse } from "next/server";
import {getXataClient} from "@/src/xata";

interface VideoData {
  title: string
  number_of_views: string
  video_length: string
  thumbnail_url: string
  ratings: number
}

const xata = getXataClient()

const fetchData = async (youtubeUrl: string): Promise<VideoData> => {
  const url = "https://apps.beam.cloud/iw84c"
  const token = "YjgyODRhZDQzNjJkYTc5ODA4MmMzMDM3NzhkNWI2MGE6ZWUwOWVlZjljOTEzMjNjMWYzMzY3MGMwMzFkNjRjMDA="
  const requestBody = {
    url: youtubeUrl,
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate",
        Authorization: `Basic ${token}`,
        Connection: "keep-alive",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error("Request failed")
    }

    const yt = await response.json()
    console.log(yt)
    const videoData: VideoData = {
      title: yt.response.title,
      number_of_views: yt.response.number_of_views.toString(),
      video_length: yt.response.video_length,
      thumbnail_url: yt.response.thumbnail_url,
      ratings: yt.response.rating,
    }
    return videoData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function POST(request: Request) {
  const res = await request.json()
  const youtubeUrl = res.url
  const corelation_id = res.id
  const data = await fetchData(youtubeUrl)
  const record = await xata.db.info.create({
    title: data.title,
    number_of_views: data.number_of_views.toString(),
    video_length: data.video_length.toString(),
    thumbnail_url: data.thumbnail_url,
    ratings: String(data.ratings),
    corelation_id: corelation_id,
    transcription_status: "pending",
  })
  return NextResponse.json({ record })
}

export async function GET(request: Request) {
  const page = await xata.db.info.getPaginated({
    pagination: {
      size: 15,
    },
  })
  return NextResponse.json({ data: page.records })
}
